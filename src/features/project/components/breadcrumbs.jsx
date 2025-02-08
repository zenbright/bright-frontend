import { ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';
import React from 'react';

const ProjectBreadCrumbs = ({
    projectType = 'Software',
    projectOwner = 'MUDOKER',
}) => {
    return (
        <div className="flex items-center pt-2 text-xs font-bold text-project_text">
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

ProjectBreadCrumbs.propTypes = {
    projectType: PropTypes.string,
    projectOwner: PropTypes.string,
};

export default ProjectBreadCrumbs;
