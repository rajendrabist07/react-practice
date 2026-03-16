import { useEffect } from 'react';
import './TopicModal.css';

function TopicModal({ topic, onClose }) {
    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    if (!topic) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="modal-header" style={{ background: topic.color }}>
                    <div className="modal-header-content">
                        <div className="modal-icon">{topic.icon}</div>
                        <div className="modal-title-section">
                            <h2 className="modal-title">{topic.title}</h2>
                            <div className="modal-badges">
                                <span className="category-badge">{topic.category}</span>
                                <span className={`level-badge level-${topic.level.toLowerCase()}`}>
                                    {topic.level}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button className="modal-close-btn" onClick={onClose}>✕</button>
                </div>

                {/* Content */}
                <div className="modal-body">
                    {/* Description */}
                    <div className="modal-section">
                        <p className="topic-description">{topic.description}</p>
                    </div>

                    {/* Explanation */}
                    <div className="modal-section">
                        <h3 className="section-title">📖 What is it?</h3>
                        <div className="explanation-text">
                            {topic.explanation.split('\n').map((line, idx) => (
                                <p key={idx}>{line}</p>
                            ))}
                        </div>
                    </div>

                    {/* Code Example */}
                    {topic.codeExample && (
                        <div className="modal-section">
                            <h3 className="section-title">💻 Code Example</h3>
                            <pre className="code-block">
                                <code>{topic.codeExample}</code>
                            </pre>
                            <button
                                className="copy-btn"
                                onClick={() => {
                                    navigator.clipboard.writeText(topic.codeExample);
                                    alert('Code copied! 📋');
                                }}
                            >
                                📋 Copy Code
                            </button>
                        </div>
                    )}

                    {/* Real World Example */}
                    {topic.realWorldExample && (
                        <div className="modal-section real-world">
                            <h3 className="section-title">🌍 Real-World Usage</h3>
                            <p className="real-world-text">{topic.realWorldExample}</p>
                        </div>
                    )}

                    {/* Prerequisites */}
                    {topic.prerequisites && topic.prerequisites.length > 0 && (
                        <div className="modal-section">
                            <h3 className="section-title">📌 Prerequisites</h3>
                            <div className="tag-list">
                                {topic.prerequisites.map((prereq, idx) => (
                                    <span key={idx} className="tag prerequisite-tag">
                                        {prereq}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Next Steps */}
                    {topic.nextSteps && topic.nextSteps.length > 0 && (
                        <div className="modal-section">
                            <h3 className="section-title">🚀 What's Next?</h3>
                            <div className="tag-list">
                                {topic.nextSteps.map((step, idx) => (
                                    <span key={idx} className="tag next-step-tag">
                                        {step}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Resources */}
                    {topic.resources && topic.resources.length > 0 && (
                        <div className="modal-section">
                            <h3 className="section-title">📚 Learning Resources</h3>
                            <ul className="resources-list">
                                {topic.resources.map((resource, idx) => (
                                    <li key={idx} className="resource-item">
                                        🔗 {resource}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TopicModal;