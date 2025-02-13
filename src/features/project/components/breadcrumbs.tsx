import { ChevronRight } from 'lucide-react';
import React from 'react';

interface ProjectBreadCrumbsProps {
    projectType?: string;
    projectOwner?: string;
}

const ProjectBreadCrumbs: React.FC<ProjectBreadCrumbsProps> = ({
    projectType = 'Software',
    projectOwner = 'MUDOKER',
}) => {
    return (
        <div className="text-project_text flex items-center pt-2 text-xs font-bold">
            <button className="text-project_text hover:text-gray-500 focus:outline-hidden">
                PROJECTS
            </button>

            <ChevronRight className="h-5 w-5" />

            <button className="text-project_text hover:text-gray-500 focus:outline-hidden">
                {projectType}
            </button>

            <ChevronRight className="h-5 w-5" />

            <button className="text-project_text hover:text-gray-500 focus:outline-hidden">
                {projectOwner}
            </button>
        </div>
    );
};

export default ProjectBreadCrumbs;
