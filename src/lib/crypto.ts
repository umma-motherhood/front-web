// Enkripsi dan hashing menggunakan Web Crypto API (PBKDF2-HMAC-SHA512 + AES-GCM 256-bit)
// Berjalan 100% di peramban admin. Tidak ada PIN atau Token yang dicatat di src/data atau repository.

export type PinHashAlg = "sha256" | "pbkdf2-sha512";

export interface EncryptedPayload {
  ciphertext: string;
  iv: string;
  salt: string;
  kdfAlg?: "pbkdf2-sha512";
}

const PBKDF2_ITERATIONS = 150000;

function bufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function base64ToBuffer(base64: string): ArrayBuffer {
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

async function deriveKey(
  pin: string,
  salt: Uint8Array,
  kdfAlg?: "pbkdf2-sha512"
): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(pin),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const isSha512 = kdfAlg === "pbkdf2-sha512";

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt as BufferSource,
      iterations: isSha512 ? PBKDF2_ITERATIONS : 100000,
      hash: isSha512 ? "SHA-512" : "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function hashPin(
  pin: string,
  saltBase64?: string,
  alg: PinHashAlg = "pbkdf2-sha512"
): Promise<{ hash: string; salt: string; alg: PinHashAlg }> {
  const enc = new TextEncoder();
  const saltBytes = saltBase64
    ? new Uint8Array(base64ToBuffer(saltBase64))
    : window.crypto.getRandomValues(new Uint8Array(16));
  const pinData = enc.encode(pin);

  if (alg === "sha256") {
    const combined = new Uint8Array(saltBytes.byteLength + pinData.byteLength);
    combined.set(saltBytes, 0);
    combined.set(pinData, saltBytes.byteLength);
    const digest = await window.crypto.subtle.digest("SHA-256", combined);
    return {
      hash: bufferToBase64(digest),
      salt: bufferToBase64(saltBytes),
      alg: "sha256",
    };
  }

  // PBKDF2-HMAC-SHA512 (150.000 iterasi, output 512-bit)
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    pinData,
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedBits = await window.crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBytes as BufferSource,
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-512",
    },
    keyMaterial,
    512
  );

  return {
    hash: bufferToBase64(derivedBits),
    salt: bufferToBase64(saltBytes),
    alg: "pbkdf2-sha512",
  };
}

export async function verifyPin(
  pin: string,
  storedHash: string,
  storedSalt: string,
  alg?: PinHashAlg
): Promise<boolean> {
  try {
    const targetAlg: PinHashAlg = alg || "sha256";
    const { hash } = await hashPin(pin, storedSalt, targetAlg);
    return hash === storedHash;
  } catch {
    return false;
  }
}

export async function encryptData(
  data: string,
  pin: string
): Promise<EncryptedPayload> {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(pin, salt, "pbkdf2-sha512");
  const enc = new TextEncoder();

  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    enc.encode(data)
  );

  return {
    ciphertext: bufferToBase64(encrypted),
    iv: bufferToBase64(iv),
    salt: bufferToBase64(salt),
    kdfAlg: "pbkdf2-sha512",
  };
}

export async function decryptData(
  payload: EncryptedPayload,
  pin: string
): Promise<string> {
  const salt = new Uint8Array(base64ToBuffer(payload.salt));
  const iv = new Uint8Array(base64ToBuffer(payload.iv));
  const ciphertext = base64ToBuffer(payload.ciphertext);
  const key = await deriveKey(pin, salt, payload.kdfAlg);

  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv,
    },
    key,
    ciphertext
  );

  const dec = new TextDecoder();
  return dec.decode(decrypted);
}
