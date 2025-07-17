import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const JournalEditor = ({ 
  content, 
  onChange, 
  onSave, 
  isAnalyzing, 
  isSaving, 
  lastSaved,
  onTriggerCrisis 
}) => {
  const [wordCount, setWordCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (content) {
      const words = content.trim().split(/\s+/).filter(word => word.length > 0);
      setWordCount(words.length);
      setCharacterCount(content.length);
      
      // Crisis detection keywords (simplified for demo)
      const crisisKeywords = ['hurt myself', 'end it all', 'no point', 'give up', 'suicide', 'kill myself'];
      const hasCrisisLanguage = crisisKeywords.some(keyword => 
        content.toLowerCase().includes(keyword)
      );
      
      if (hasCrisisLanguage && content.length > 50) {
        onTriggerCrisis('Crisis language detected in journal entry');
      }
    } else {
      setWordCount(0);
      setCharacterCount(0);
    }
  }, [content, onTriggerCrisis]);

  const handleTextareaChange = (e) => {
    onChange(e.target.value);
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(textarea.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [content]);

  const formatLastSaved = (timestamp) => {
    if (!timestamp) return '';
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Saved just now';
    if (minutes === 1) return 'Saved 1 minute ago';
    if (minutes < 60) return `Saved ${minutes} minutes ago`;
    
    return timestamp.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card rounded-organic-lg border border-border shadow-therapeutic p-6 mb-6">
      {/* Editor Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Edit3" size={18} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Your Journal Entry</span>
        </div>
        
        <div className="flex items-center space-x-4">
          {isAnalyzing && (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs text-muted-foreground">Analyzing...</span>
            </div>
          )}
          
          {lastSaved && (
            <span className="text-xs text-muted-foreground">
              {formatLastSaved(lastSaved)}
            </span>
          )}
        </div>
      </div>

      {/* Text Editor */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleTextareaChange}
          placeholder="Start writing about your day, your feelings, or whatever comes to mind. This is your safe space to express yourself freely..."
          className="w-full min-h-[200px] p-4 bg-background border border-border rounded-organic resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-therapeutic text-foreground placeholder-muted-foreground"
          style={{ 
            fontFamily: 'inherit',
            fontSize: '16px',
            lineHeight: '1.6'
          }}
        />
        
        {/* Character/Word Count */}
        <div className="absolute bottom-3 right-3 flex items-center space-x-4 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm px-2 py-1 rounded">
          <span>{wordCount} words</span>
          <span>{characterCount} characters</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-xs text-muted-foreground">
            Your entries are private and encrypted
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onChange('')}
            disabled={!content || isSaving}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Clear
          </Button>
          
          <Button
            variant="primary"
            size="sm"
            onClick={onSave}
            loading={isSaving}
            disabled={!content.trim() || isSaving}
            iconName="Save"
            iconPosition="left"
          >
            Save Entry
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JournalEditor;