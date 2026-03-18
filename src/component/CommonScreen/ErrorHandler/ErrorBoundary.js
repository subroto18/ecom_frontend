import React, { Fragment} from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        // Define a state variable to track whether is an error or not
        this.state = { hasError: false }
    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI

        return { hasError: true }
    }
    componentDidCatch(error, errorInfo) {
        // You can use your own error logging service here
        console.log({ error, errorInfo })
        this.setState({
            hasError:true
        })

    }
    render() {

        // Check if the error is thrown
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
                <Fragment>
                    <div className='pageNotFound py-5 d-flex justify-content-center align-items-center'>
                        <div className='text-center'>
                            <h1>500</h1>
                            <h3>Opps,Server Error!</h3>
                            <p>Connect with our Technical support team...</p>
                        </div>
                    </div>
                </Fragment>
            )
        }
        // Return children components in case of no error
        return this.props.children
    }
}

export default ErrorBoundary
