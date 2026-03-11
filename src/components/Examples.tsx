import React from 'react';
import { samples } from '../data/samples';

interface ExamplesProps {
    onSelectSample: (text: string) => void;
}

export const Examples: React.FC<ExamplesProps> = ({ onSelectSample }) => {
    return (
        <section className="tab-content active">
            <div className="samples-grid">
                {samples.map((sample) => (
                    <div 
                        key={sample.id} 
                        className="sample-card glass"
                        onClick={() => onSelectSample(sample.text)}
                    >
                        <span className="sample-tag">{sample.tag}</span>
                        <h3>{sample.title}</h3>
                        <p>{sample.text.substring(0, 100)}...</p>
                    </div>
                ))}
            </div>
        </section>
    );
};
