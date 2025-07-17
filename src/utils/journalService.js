import { supabase } from './supabase';
import { encryptData, decryptData, initializeEncryption, getEncryptionKey } from './encryption';

class JournalService {
  // Save a new journal entry with encryption
  async saveJournalEntry(userId, entryData) {
    try {
      // Get or initialize encryption key
      const encryptionKey = await initializeEncryption(userId);
      
      if (!encryptionKey) {
        throw new Error('Failed to initialize encryption');
      }
      
      // Encrypt the journal entry content
      const encryptedContent = await encryptData(entryData.content, encryptionKey);
      
      // Prepare entry data for storage
      // Note: We only encrypt the content, keeping metadata like date and mood unencrypted
      // for filtering and analytics purposes
      const entry = {
        user_id: userId,
        encrypted_content: encryptedContent,
        mood: entryData.mood || null,
        tags: entryData.tags || null,
        created_at: new Date().toISOString()
      };
      
      // Save to Supabase
      const { data, error } = await supabase
        .from('journal_entries')
        .insert(entry)
        .select()
        .single();
        
      if (error) {
        throw error;
      }
      
      return { success: true, data };
    } catch (error) {
      console.error('Error saving journal entry:', error);
      return { success: false, error: error.message };
    }
  }
  
  // Get journal entries for a user
  async getJournalEntries(userId, options = {}) {
    try {
      // Get encryption key
      const encryptionKey = getEncryptionKey(userId);
      
      if (!encryptionKey) {
        throw new Error('Encryption key not found');
      }
      
      // Build query
      let query = supabase
        .from('journal_entries')
        .select('*')
        .eq('user_id', userId);
        
      // Add filters if provided
      if (options.startDate) {
        query = query.gte('created_at', options.startDate);
      }
      
      if (options.endDate) {
        query = query.lte('created_at', options.endDate);
      }
      
      if (options.mood) {
        query = query.eq('mood', options.mood);
      }
      
      if (options.tags) {
        query = query.contains('tags', options.tags);
      }
      
      // Add ordering
      query = query.order('created_at', { ascending: options.ascending ?? false });
      
      // Add pagination
      if (options.limit) {
        query = query.limit(options.limit);
      }
      
      // Execute query
      const { data, error } = await query;
      
      if (error) {
        throw error;
      }
      
      // Decrypt content for each entry
      const decryptedEntries = await Promise.all(
        data.map(async (entry) => {
          try {
            const decryptedContent = await decryptData(entry.encrypted_content, encryptionKey);
            return {
              ...entry,
              content: decryptedContent,
              encrypted_content: undefined // Remove encrypted content from result
            };
          } catch (decryptError) {
            console.error(`Failed to decrypt entry ${entry.id}:`, decryptError);
            return {
              ...entry,
              content: '[Encryption error: Could not decrypt content]',
              encrypted_content: undefined
            };
          }
        })
      );
      
      return { success: true, data: decryptedEntries };
    } catch (error) {
      console.error('Error getting journal entries:', error);
      return { success: false, error: error.message };
    }
  }
  
  // Get a single journal entry
  async getJournalEntry(userId, entryId) {
    try {
      // Get encryption key
      const encryptionKey = getEncryptionKey(userId);
      
      if (!encryptionKey) {
        throw new Error('Encryption key not found');
      }
      
      // Get entry from Supabase
      const { data, error } = await supabase
        .from('journal_entries')
        .select('*')
        .eq('id', entryId)
        .eq('user_id', userId)
        .single();
        
      if (error) {
        throw error;
      }
      
      if (!data) {
        throw new Error('Journal entry not found');
      }
      
      // Decrypt content
      const decryptedContent = await decryptData(data.encrypted_content, encryptionKey);
      
      return {
        success: true,
        data: {
          ...data,
          content: decryptedContent,
          encrypted_content: undefined
        }
      };
    } catch (error) {
      console.error('Error getting journal entry:', error);
      return { success: false, error: error.message };
    }
  }
  
  // Update a journal entry
  async updateJournalEntry(userId, entryId, updates) {
    try {
      // Get encryption key
      const encryptionKey = getEncryptionKey(userId);
      
      if (!encryptionKey) {
        throw new Error('Encryption key not found');
      }
      
      // Prepare updates
      const updatedData = { ...updates };
      
      // If content is being updated, encrypt it
      if (updates.content) {
        updatedData.encrypted_content = await encryptData(updates.content, encryptionKey);
        delete updatedData.content; // Remove unencrypted content
      }
      
      // Update in Supabase
      const { data, error } = await supabase
        .from('journal_entries')
        .update(updatedData)
        .eq('id', entryId)
        .eq('user_id', userId)
        .select()
        .single();
        
      if (error) {
        throw error;
      }
      
      return { success: true, data };
    } catch (error) {
      console.error('Error updating journal entry:', error);
      return { success: false, error: error.message };
    }
  }
  
  // Delete a journal entry
  async deleteJournalEntry(userId, entryId) {
    try {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', entryId)
        .eq('user_id', userId);
        
      if (error) {
        throw error;
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting journal entry:', error);
      return { success: false, error: error.message };
    }
  }
  
  // Delete all journal entries for a user
  async deleteAllJournalEntries(userId) {
    try {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('user_id', userId);
        
      if (error) {
        throw error;
      }
      
      return { success: true };
    } catch (error) {
      console.error('Error deleting all journal entries:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new JournalService();