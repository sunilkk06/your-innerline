import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportDataPanel = ({ onExport, isExporting }) => {
  const [exportConfig, setExportConfig] = useState({
    format: 'json',
    dateRange: 'all',
    includeContent: true,
    includeMood: true,
    includeSentiment: true,
    includeAIInsights: false,
    includeTimestamps: true
  });

  const formatOptions = [
    { value: 'json', label: 'JSON Format', description: 'Machine-readable structured data' },
    { value: 'csv', label: 'CSV Format', description: 'Spreadsheet-compatible format' },
    { value: 'txt', label: 'Text Format', description: 'Human-readable plain text' },
    { value: 'pdf', label: 'PDF Report', description: 'Formatted document with charts' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'year', label: 'This Year' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'month', label: 'This Month' },
    { value: 'week', label: 'This Week' }
  ];

  const handleConfigChange = (key, value) => {
    setExportConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleExport = () => {
    onExport(exportConfig);
  };

  const getEstimatedSize = () => {
    // Mock calculation based on config
    let baseSize = 50; // KB
    if (exportConfig.includeContent) baseSize += 200;
    if (exportConfig.includeAIInsights) baseSize += 100;
    if (exportConfig.format === 'pdf') baseSize *= 3;
    
    return baseSize > 1000 ? `${(baseSize / 1000).toFixed(1)} MB` : `${baseSize} KB`;
  };

  const getFormatDescription = () => {
    const format = formatOptions.find(f => f.value === exportConfig.format);
    return format?.description || '';
  };

  return (
    <div className="bg-card rounded-organic-lg border border-border p-6">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-organic flex items-center justify-center">
          <Icon name="Download" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-foreground">
            Export Your Data
          </h3>
          <p className="text-sm text-muted-foreground">
            Download your journal entries and mood data
          </p>
        </div>
      </div>

      {/* Export Configuration */}
      <div className="space-y-6">
        {/* Format Selection */}
        <div>
          <Select
            label="Export Format"
            description={getFormatDescription()}
            options={formatOptions}
            value={exportConfig.format}
            onChange={(value) => handleConfigChange('format', value)}
          />
        </div>

        {/* Date Range */}
        <div>
          <Select
            label="Date Range"
            description="Select the time period for your export"
            options={dateRangeOptions}
            value={exportConfig.dateRange}
            onChange={(value) => handleConfigChange('dateRange', value)}
          />
        </div>

        {/* Data Inclusion Options */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Include in Export
          </label>
          <div className="space-y-3">
            <Checkbox
              label="Journal Content"
              description="Your written journal entries"
              checked={exportConfig.includeContent}
              onChange={(e) => handleConfigChange('includeContent', e.target.checked)}
            />
            
            <Checkbox
              label="Mood Data"
              description="Emotional state and mood tracking"
              checked={exportConfig.includeMood}
              onChange={(e) => handleConfigChange('includeMood', e.target.checked)}
            />
            
            <Checkbox
              label="Sentiment Analysis"
              description="AI-generated sentiment scores"
              checked={exportConfig.includeSentiment}
              onChange={(e) => handleConfigChange('includeSentiment', e.target.checked)}
            />
            
            <Checkbox
              label="AI Insights"
              description="Therapeutic suggestions and insights"
              checked={exportConfig.includeAIInsights}
              onChange={(e) => handleConfigChange('includeAIInsights', e.target.checked)}
            />
            
            <Checkbox
              label="Timestamps"
              description="Entry dates and times"
              checked={exportConfig.includeTimestamps}
              onChange={(e) => handleConfigChange('includeTimestamps', e.target.checked)}
            />
          </div>
        </div>

        {/* Export Preview */}
        <div className="bg-muted/50 rounded-organic p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-foreground">
              Export Preview
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              Est. size: {getEstimatedSize()}
            </span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="FileText" size={14} className="text-primary" />
              <span className="text-xs text-muted-foreground">
                Format: {formatOptions.find(f => f.value === exportConfig.format)?.label}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={14} className="text-primary" />
              <span className="text-xs text-muted-foreground">
                Range: {dateRangeOptions.find(d => d.value === exportConfig.dateRange)?.label}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Database" size={14} className="text-primary" />
              <span className="text-xs text-muted-foreground">
                {Object.values(exportConfig).filter(v => v === true).length - 1} data types included
              </span>
            </div>
          </div>
        </div>

        {/* Privacy Notice */}
        <div className="bg-warning/5 border border-warning/20 rounded-organic p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={16} className="text-warning mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">
                Privacy & Security
              </h4>
              <p className="text-xs text-muted-foreground">
                Your exported data is processed locally and never shared with third parties. 
                Keep your downloaded files secure as they contain personal information.
              </p>
            </div>
          </div>
        </div>

        {/* Export Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            variant="primary"
            onClick={handleExport}
            disabled={isExporting}
            loading={isExporting}
            iconName="Download"
            iconPosition="left"
            className="flex-1"
          >
            {isExporting ? 'Preparing Export...' : 'Export Data'}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => window.open('/privacy-policy', '_blank')}
            iconName="ExternalLink"
            iconPosition="right"
            className="sm:w-auto"
          >
            Privacy Policy
          </Button>
        </div>

        {/* Export History */}
        <div className="pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">
            Recent Exports
          </h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded-organic">
              <div className="flex items-center space-x-2">
                <Icon name="FileText" size={14} className="text-muted-foreground" />
                <span className="text-xs text-foreground">mood-data-2024-07.json</span>
              </div>
              <span className="text-xs text-muted-foreground">2 days ago</span>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-muted/30 rounded-organic">
              <div className="flex items-center space-x-2">
                <Icon name="FileSpreadsheet" size={14} className="text-muted-foreground" />
                <span className="text-xs text-foreground">journal-entries-2024-06.csv</span>
              </div>
              <span className="text-xs text-muted-foreground">1 week ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportDataPanel;