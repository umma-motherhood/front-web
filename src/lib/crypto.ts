// Enkripsi dan dekripsi menggunakan Web Crypto API (AES-GCM 256-bit + PBKDF2)
// Berjalan di sisi peramban untuk mengamankan GitHub Token dan sesi admin

export interface EncryptedPayload {
  ciphertext: string;
  iv: string;
  salt: string;
}

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

async function deriveKey(pin: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    "raw",
    enc.encode(pin),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt as BufferSource,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function hashPin(pin: string, saltHex?: string): Promise<{ hash: string; salt: string }> {
  const enc = new TextEncoder();
  const salt = saltHex ? base64ToBuffer(saltHex) : window.crypto.getRandomValues(new Uint8Array(16));
  const pinData = enc.encode(pin);
  
  const combined = new Uint8Array(salt.byteLength + pinData.byteLength);
  combined.set(new Uint8Array(salt), 0);
  combined.set(pinData, salt.byteLength);

  const digest = await window.crypto.subtle.digest("SHA-256", combined);
  return {
    hash: bufferToBase64(digest),
    salt: bufferToBase64(salt),
  };
}

export async function verifyPin(pin: string, storedHash: string, storedSalt: string): Promise<boolean> {
  try {
    const { hash } = await hashPin(pin, storedSalt);
    return hash === storedHash;
  } catch {
    return false;
  }
}

export async function encryptData(data: string, pin: string): Promise<EncryptedPayload> {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(pin, salt);
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
  };
}

export async function decryptData(payload: EncryptedPayload, pin: string): Promise<string> {
  const salt = new Uint8Array(base64ToBuffer(payload.salt));
  const iv = new Uint8Array(base64ToBuffer(payload.iv));
  const ciphertext = base64ToBuffer(payload.ciphertext);
  const key = await deriveKey(pin, salt);

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
