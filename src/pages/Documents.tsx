import React, { useEffect, useRef } from 'react';
import { Upload, FolderPlus, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useStore } from '../lib/store';
import { documentService } from '../lib/services/documentService';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { DocumentList } from '../components/DocumentList';
import DocumentAssignModal from '../components/DocumentAssignModal';

export default function Documents() {
  const { documents, cases, fetchDocuments, fetchCases } = useStore();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [uploading, setUploading] = React.useState(false);
  const [selectedDocument, setSelectedDocument] = React.useState<{
    id: string;
    name: string;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchDocuments();
    fetchCases();
  }, [fetchDocuments, fetchCases]);

  const filteredDocuments = documents.filter((doc) =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    try {
      setUploading(true);
      await documentService.upload({ file: e.target.files[0] });
      toast.success('Document uploaded successfully');
      await fetchDocuments();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async (document: any) => {
    try {
      await documentService.delete({
        id: document.id,
        filePath: new URL(document.url).pathname.split('/').pop()!,
      });
      toast.success('Document deleted successfully');
      await fetchDocuments();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Documents</h1>
        <p className="mt-2 text-sm text-gray-700">
          Manage and organize all your legal documents.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                icon={Upload}
              >
                {uploading ? 'Uploading...' : 'Upload Files'}
              </Button>
              <Button
                variant="secondary"
                icon={FolderPlus}
              >
                New Folder
              </Button>
            </div>
            <div className="relative max-w-xs">
              <Input
                icon={Search}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search documents..."
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <DocumentList
            documents={filteredDocuments}
            cases={cases}
            onAssign={(doc) => setSelectedDocument({ id: doc.id, name: doc.name })}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>

      {selectedDocument && (
        <DocumentAssignModal
          isOpen={!!selectedDocument}
          onClose={() => setSelectedDocument(null)}
          documentId={selectedDocument.id}
          documentName={selectedDocument.name}
        />
      )}
    </div>
  );
}