import { Github, Linkedin } from 'lucide-react';

interface MembroProps {
  nomeMembro?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}

export default function MembroEquipe({ nomeMembro, githubUrl, linkedinUrl }: MembroProps) {
  return (
    <div className="flex flex-col items-center text-center p-4 text-white gap-2 lg:items-start lg:text-left lg:pl-40">
        <p className="text-lg font-semibold">{nomeMembro}</p>
        <div className="flex gap-3">
            {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-5 h-5 hover:text-blue-400 transition" />
            </a>
            )}
            {linkedinUrl && (
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 hover:text-blue-400 transition" />
            </a>
            )}
        </div>
    </div>
  );
}
