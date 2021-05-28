import * as React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Customized error handling goes here!
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1>Something wen't wrong, please try again.</h1>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
