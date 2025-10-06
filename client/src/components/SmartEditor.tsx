
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Link, 
  Image, 
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Eye,
  Edit3,
  Wand2
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SmartEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

export default function SmartEditor({ 
  value, 
  onChange, 
  placeholder = "اكتب محتوى المقال هنا...", 
  className,
  minHeight = "300px"
}: SmartEditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const [selectedText, setSelectedText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Track text selection
  const handleTextSelect = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const selected = value.substring(start, end);
      setSelectedText(selected);
    }
  };

  // Insert text at cursor position
  const insertText = (before: string, after: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = 
      value.substring(0, start) + 
      before + 
      selectedText + 
      after + 
      value.substring(end);
    
    onChange(newText);
    
    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        end + before.length
      );
    }, 0);
  };

  // Smart text enhancements
  const enhanceText = () => {
    // Auto-format common patterns
    let enhanced = value;
    
    // Convert quotes to proper format
    enhanced = enhanced.replace(/"/g, '"').replace(/"/g, '"');
    
    // Fix common spacing issues
    enhanced = enhanced.replace(/\s+/g, ' ');
    enhanced = enhanced.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    // Auto-capitalize sentences
    enhanced = enhanced.replace(/\. ([a-z])/g, (match, letter) => '. ' + letter.toUpperCase());
    
    onChange(enhanced);
  };

  // Toolbar button component
  const ToolbarButton = ({ 
    icon: Icon, 
    tooltip, 
    onClick, 
    active = false 
  }: { 
    icon: any; 
    tooltip: string; 
    onClick: () => void; 
    active?: boolean;
  }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={active ? "secondary" : "ghost"}
            size="sm"
            onClick={onClick}
            className="h-8 w-8 p-0"
          >
            <Icon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  // Convert markdown-like text to HTML for preview
  const renderPreview = (text: string) => {
    let html = text;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2 mt-4">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-3 mt-6">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 mt-8">$1</h1>');
    
    // Bold and italic
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-blue-600 hover:underline">$1</a>');
    
    // Quotes
    html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-gray-300 pl-4 italic my-4">$1</blockquote>');
    
    // Line breaks
    html = html.replace(/\n/g, '<br>');
    
    return html;
  };

  return (
    <div className={cn("border rounded-lg overflow-hidden", className)}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b bg-muted/50">
        <div className="flex items-center gap-1">
          <ToolbarButton
            icon={Heading1}
            tooltip="عنوان رئيسي"
            onClick={() => insertText("# ", "")}
          />
          <ToolbarButton
            icon={Heading2}
            tooltip="عنوان فرعي"
            onClick={() => insertText("## ", "")}
          />
          <ToolbarButton
            icon={Heading3}
            tooltip="عنوان ثانوي"
            onClick={() => insertText("### ", "")}
          />
        </div>
        
        <Separator orientation="vertical" className="h-6" />
        
        <div className="flex items-center gap-1">
          <ToolbarButton
            icon={Bold}
            tooltip="نص عريض"
            onClick={() => insertText("**", "**")}
          />
          <ToolbarButton
            icon={Italic}
            tooltip="نص مائل"
            onClick={() => insertText("*", "*")}
          />
          <ToolbarButton
            icon={Underline}
            tooltip="نص تحته خط"
            onClick={() => insertText("<u>", "</u>")}
          />
        </div>
        
        <Separator orientation="vertical" className="h-6" />
        
        <div className="flex items-center gap-1">
          <ToolbarButton
            icon={List}
            tooltip="قائمة نقطية"
            onClick={() => insertText("- ", "")}
          />
          <ToolbarButton
            icon={ListOrdered}
            tooltip="قائمة مرقمة"
            onClick={() => insertText("1. ", "")}
          />
          <ToolbarButton
            icon={Quote}
            tooltip="اقتباس"
            onClick={() => insertText("> ", "")}
          />
        </div>
        
        <Separator orientation="vertical" className="h-6" />
        
        <div className="flex items-center gap-1">
          <ToolbarButton
            icon={Link}
            tooltip="رابط"
            onClick={() => insertText("[نص الرابط](", ")")}
          />
          <ToolbarButton
            icon={Image}
            tooltip="صورة"
            onClick={() => insertText("![وصف الصورة](", ")")}
          />
        </div>
        
        <Separator orientation="vertical" className="h-6" />
        
        <ToolbarButton
          icon={Wand2}
          tooltip="تحسين النص تلقائياً"
          onClick={enhanceText}
        />
        
        <div className="ml-auto flex items-center gap-1">
          <ToolbarButton
            icon={Edit3}
            tooltip="وضع التحرير"
            onClick={() => setIsPreview(false)}
            active={!isPreview}
          />
          <ToolbarButton
            icon={Eye}
            tooltip="معاينة"
            onClick={() => setIsPreview(true)}
            active={isPreview}
          />
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div className="relative">
        {isPreview ? (
          <div 
            className="p-4 prose prose-sm max-w-none min-h-[300px]"
            dangerouslySetInnerHTML={{ __html: renderPreview(value) }}
          />
        ) : (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onSelect={handleTextSelect}
            placeholder={placeholder}
            className={cn(
              "w-full p-4 border-0 resize-none focus:outline-none bg-transparent",
              "font-mono text-sm leading-relaxed"
            )}
            style={{ minHeight }}
            dir="auto"
          />
        )}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 text-xs text-muted-foreground border-t bg-muted/30">
        <div className="flex items-center gap-4">
          <span>الكلمات: {value.split(/\s+/).filter(word => word.length > 0).length}</span>
          <span>الأحرف: {value.length}</span>
          <span>وقت القراءة: ~{Math.ceil(value.split(/\s+/).length / 200)} دقيقة</span>
        </div>
        {selectedText && (
          <span>محدد: {selectedText.length} حرف</span>
        )}
      </div>
    </div>
  );
}
