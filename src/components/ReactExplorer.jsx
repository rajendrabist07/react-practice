import { useState } from "react";
import "./ReactExplorer.css";

function ReactExplorer() {

    const [selectedFeature, setSelectedFeature] = useState(null);

    const featureInfo = {
        component: "Component Based Architecture vaneko React ko core concept ho. UI lai sano sano reusable pieces ma break garincha. Example: Navbar, Card, Footer sab separate components huncha.",

        vdom: "Virtual DOM ek lightweight copy ho real DOM ko. React le pahila Virtual DOM update garcha ani difference calculate garera matra real DOM update garcha. Yo le performance dherai fast banaucha.",

        hooks: "Hooks React ko special functions hun jasle functional components vitra state ra lifecycle features use garna dincha. Example: useState, useEffect.",

        usestate: "useState hook le component vitra state manage garna dincha. State change huda component automatically re-render huncha.",

        useeffect: "useEffect hook side effects handle garna use huncha. Example: API call, timer, data fetch, DOM update.",

        fast: "React fast huncha kina vane Virtual DOM use garcha ra minimal DOM updates garcha.",

        reusable: "Reusable components ko matlab ek component lai multiple thau ma use garna milcha. Yo le code clean, maintainable ra scalable banaucha."
    };

    return (
        <div className="ex-container">

            <h1 className="title">React Learning Lab</h1>

            <p className="subtitle">
                Click any concept below to explore React
            </p>

            <div className="topics">

                <span onClick={() => setSelectedFeature("component")}>
                    Component Architecture
                </span>

                <span onClick={() => setSelectedFeature("vdom")}>
                    Virtual DOM
                </span>

                <span onClick={() => setSelectedFeature("hooks")}>
                    Hooks
                </span>

                <span onClick={() => setSelectedFeature("usestate")}>
                    useState
                </span>

                <span onClick={() => setSelectedFeature("useeffect")}>
                    useEffect
                </span>

                <span onClick={() => setSelectedFeature("fast")}>
                    Fast Rendering
                </span>

                <span onClick={() => setSelectedFeature("reusable")}>
                    Reusable Components
                </span>

            </div>

            {selectedFeature && (
                <div className="ex-card">
                    <h2>Concept Explanation</h2>
                    <p>{featureInfo[selectedFeature]}</p>
                </div>
            )}

        </div>
    );
}

export default ReactExplorer;