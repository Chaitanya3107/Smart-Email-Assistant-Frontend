import React, { useState } from 'react';  // Make sure to import useState
import { Container, Typography } from '@mui/material';  // Container is missing
import './App.css';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom> {/* Fixed 'variant' typo */}
        Email Reply Generator
      </Typography>
    </Container>
  );
}

export default App;
