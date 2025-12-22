//this code was given by ai for checking an error no longer used/connected to anything else in the project
//was used to find errrors in page loading
import React from 'react';
import Typography from '@mui/material/Typography';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {

  }

  render() {
    if (this.state.hasError) {
      return (
        <Typography variant="h6" color="error">
          {this.state.error?.message || 'Something went wrong rendering this section.'}
        </Typography>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
