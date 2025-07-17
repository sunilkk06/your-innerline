/**
 * Utility functions for encrypting and decrypting journal entries
 * Uses the Web Crypto API for client-side encryption
 */

// Convert string to ArrayBuffer
const str2ab = (str) => {
  const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  const bufView = new Uint16Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
};

// Convert ArrayBuffer to string
const ab2str = (buf) => {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
};

// Generate a new encryption key
export const generateEncryptionKey = async () => {
  try {
    const key = await window.crypto.subtle.generateKey(
      {
        name: "AES-GCM",
        length: 256,
      },
      true, // extractable
      ["encrypt", "decrypt"]
    );
    
    // Export the key to store it
    const exportedKey = await window.crypto.subtle.exportKey("raw", key);
    const keyBase64 = btoa(String.fromCharCode(...new Uint8Array(exportedKey)));
    
    return keyBase64;
  } catch (error) {
    console.error('Error generating encryption key:', error);
    throw error;
  }
};

// Import an existing encryption key
export const importEncryptionKey = async (keyBase64) => {
  try {
    const keyData = Uint8Array.from(atob(keyBase64), c => c.charCodeAt(0));
    
    const key = await window.crypto.subtle.importKey(
      "raw",
      keyData,
      {
        name: "AES-GCM",
        length: 256,
      },
      false, // not extractable
      ["encrypt", "decrypt"]
    );
    
    return key;
  } catch (error) {
    console.error('Error importing encryption key:', error);
    throw error;
  }
};

// Encrypt data
export const encryptData = async (data, keyBase64) => {
  try {
    const key = await importEncryptionKey(keyBase64);
    
    // Generate a random initialization vector
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    
    // Convert data to ArrayBuffer
    const dataBuffer = str2ab(JSON.stringify(data));
    
    // Encrypt the data
    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv
      },
      key,
      dataBuffer
    );
    
    // Combine IV and encrypted data
    const encryptedArray = new Uint8Array(iv.length + encryptedData.byteLength);
    encryptedArray.set(iv);
    encryptedArray.set(new Uint8Array(encryptedData), iv.length);
    
    // Convert to Base64 for storage
    return btoa(String.fromCharCode(...encryptedArray));
  } catch (error) {
    console.error('Error encrypting data:', error);
    throw error;
  }
};

// Decrypt data
export const decryptData = async (encryptedBase64, keyBase64) => {
  try {
    const key = await importEncryptionKey(keyBase64);
    
    // Convert from Base64
    const encryptedArray = Uint8Array.from(atob(encryptedBase64), c => c.charCodeAt(0));
    
    // Extract IV and encrypted data
    const iv = encryptedArray.slice(0, 12);
    const encryptedData = encryptedArray.slice(12);
    
    // Decrypt the data
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv
      },
      key,
      encryptedData
    );
    
    // Convert ArrayBuffer back to string and parse JSON
    const decryptedString = ab2str(decryptedBuffer);
    return JSON.parse(decryptedString);
  } catch (error) {
    console.error('Error decrypting data:', error);
    throw error;
  }
};

// Store encryption key securely
export const storeEncryptionKey = (keyBase64, userId) => {
  try {
    // In a real app, you might want to encrypt this key with a user password
    // For this demo, we'll store it in localStorage with the user ID
    localStorage.setItem(`encryption_key_${userId}`, keyBase64);
    return true;
  } catch (error) {
    console.error('Error storing encryption key:', error);
    return false;
  }
};

// Retrieve encryption key
export const getEncryptionKey = (userId) => {
  try {
    return localStorage.getItem(`encryption_key_${userId}`);
  } catch (error) {
    console.error('Error retrieving encryption key:', error);
    return null;
  }
};

// Initialize encryption for a new user
export const initializeEncryption = async (userId) => {
  try {
    // Check if user already has a key
    let key = getEncryptionKey(userId);
    
    if (!key) {
      // Generate a new key
      key = await generateEncryptionKey();
      storeEncryptionKey(key, userId);
    }
    
    return key;
  } catch (error) {
    console.error('Error initializing encryption:', error);
    throw error;
  }
};