"use client";

import React, { useState } from 'react';
import { Folder, FileCode, ChevronRight, ChevronDown, Package } from 'lucide-react';
import { DemoContainer } from '@/components/demos/ui/DemoShell';

// 1. הגדרת טיפוסים (Types) כדי למנוע שגיאות TypeScript
interface FileNode {
  type: 'folder' | 'file' | 'package';
  content?: string;
  children?: Record<string, FileNode>;
}

interface FileTreeItemProps {
  name: string;
  data: FileNode;
  level: number;
  onSelect: (name: string, content: string) => void;
  selectedPath: string;
}

// 2. הגדרת מבנה הקבצים עם הטיפוסים
const files: Record<string, FileNode> = {
  "my_project": {
    type: "folder",
    children: {
      "src": {
        type: "folder",
        children: {
          "mini_text": {
            type: "package", 
            children: {
              "__init__.py": {
                type: "file",
                content: `from .clean import normalize\nfrom .tokenize import tokenize\nfrom .stats import count_tokens\n\n__all__ = ["normalize", "tokenize", "count_tokens"]`
              },
              "clean.py": {
                type: "file",
                content: `def normalize(text: str) -> str:\n    """Remove extra spaces."""\n    return " ".join(text.split()).strip()`
              },
              "tokenize.py": {
                type: "file",
                content: `from .clean import normalize\n\ndef tokenize(text: str) -> list[str]:\n    return normalize(text).split()`
              },
              "stats.py": {
                type: "file",
                content: `from .tokenize import tokenize\n\ndef count_tokens(text: str) -> int:\n    return len(tokenize(text))`
              }
            }
          }
        }
      },
      "scripts": {
        type: "folder",
        children: {
          "run_demo.py": {
            type: "file",
            content: `import sys\nsys.path.append("src")\n\nfrom mini_text import normalize, count_tokens\n\ntext = " Hello   AI "\nprint(f"Clean: '{normalize(text)}'")\nprint(f"Count: {count_tokens(text)}")`
          }
        }
      },
      "tests": {
        type: "folder",
        children: {
          "test_core.py": {
            type: "file",
            content: `from mini_text import count_tokens\n\ndef test_count():\n    assert count_tokens("a b c") == 3`
          }
        }
      },
      "requirements.txt": {
        type: "file",
        content: `pandas>=2.0.0\nnumpy>=1.24.0`
      }
    }
  }
};

const FileTreeItem = ({ name, data, level, onSelect, selectedPath }: FileTreeItemProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const isSelected = selectedPath === name;
  const paddingLeft = `${level * 16}px`;

  if (data.type === "file") {
    return (
      <div 
        onClick={() => onSelect(name, data.content || "")}
        className={`flex items-center gap-2 py-1 px-2 cursor-pointer hover:bg-slate-800 transition-colors ${isSelected ? 'bg-indigo-900/50 text-indigo-300' : 'text-slate-400'}`}
        style={{ paddingLeft }}
      >
        <FileCode size={14} />
        <span className="text-sm font-mono">{name}</span>
      </div>
    );
  }

  return (
    <div>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 py-1 px-2 cursor-pointer hover:bg-slate-800/50 text-slate-300 select-none"
        style={{ paddingLeft }}
      >
        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        {data.type === "package" ? <Package size={14} className="text-yellow-500" /> : <Folder size={14} className="text-blue-400" />}
        <span className="text-sm font-bold">{name}</span>
      </div>
      {isOpen && data.children && (
        <div>
          {Object.entries(data.children).map(([childName, childData]) => (
            <FileTreeItem 
              key={childName} 
              name={childName} 
              data={childData} 
              level={level + 1} 
              onSelect={onSelect}
              selectedPath={selectedPath}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const ProjectStructureDemo = () => {
  // Safe default access
  const defaultFile = "run_demo.py";
  const defaultContent = files.my_project?.children?.scripts?.children?.["run_demo.py"]?.content || "";

  const [selectedFile, setSelectedFile] = useState(defaultFile);
  const [fileContent, setFileContent] = useState(defaultContent);

  const handleSelect = (name: string, content: string) => {
    setSelectedFile(name);
    setFileContent(content);
  };

  return (
    <DemoContainer title="Project Structure Explorer" output="" dir="ltr">
      <div className="flex h-64 border border-slate-700 rounded-lg overflow-hidden">
        {/* Sidebar - Tree */}
        <div className="w-1/3 bg-slate-900 overflow-y-auto border-r border-slate-700 p-2">
           <FileTreeItem 
              name="my_project" 
              data={files.my_project} 
              level={0} 
              onSelect={handleSelect}
              selectedPath={selectedFile}
           />
        </div>

        {/* Content - Code Preview */}
        <div className="w-2/3 bg-[#0F172A] p-4 overflow-y-auto">
          <div className="flex items-center gap-2 text-slate-500 border-b border-slate-800 pb-2 mb-2">
             <FileCode size={16} />
             <span className="text-xs font-mono uppercase">{selectedFile}</span>
          </div>
          <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap">
            {fileContent}
          </pre>
        </div>
      </div>
      <p className="text-[10px] text-slate-500 mt-2 text-center">
        * לחץ על הקבצים בצד שמאל כדי לראות את התוכן והמבנה המומלץ
      </p>
    </DemoContainer>
  );
};