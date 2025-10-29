import React, { useState } from 'react'; 
import { Container, TextField, Typography, Box } from '@mui/material';  
import './App.css'; // Make sure this file has the background styling as well

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Email Reply Generator
      </Typography>

      <Box sx={{ mx: 3 }}>
        {/* This TextField accepts the email content */}
        <TextField   
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Original Email Content"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)} 
          sx={{ mb: 2 }}
        />
      </Box>

      {/* You can later add more components like buttons for generating replies */}
    </Container>
  );
}

export default App;
