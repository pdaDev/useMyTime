import React from "react";
import {ErrorBoundaryStyled} from "./ErrorBoundaryStyled";
import {Layout} from 'shared'


export class ErrorBoundary extends React.Component {
    state = {
        hasError: false,
        errorCode: 0,
        errorMessage: ''
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log(error, errorInfo)
        this.setState(
            {
                errorCode: error.name,
                errorMessage: error.message,
                hasError: true
            })
    }

    render() {
      if (this.state.hasError) {
          return <Layout.Center>
              <ErrorBoundaryStyled errorCode={this.state.errorCode}
                                   errorMessage={this.state.errorMessage}
              />
          </Layout.Center>
      }

      // @ts-ignore
        return this.props.children
    }
}


