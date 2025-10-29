import React, { useState } from 'react';
import { Container, TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress } from '@mui/material';
import axios from 'axios';
import './App.css'; // Ensure this file has your background and other styles

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:8080/api/email/generate', {
        emailContent,
        tone,
      });

      if (typeof response.data === 'string') {
        setGeneratedReply(response.data);
      } else if (response.data && typeof response.data === 'object') {
        setGeneratedReply(JSON.stringify(response.data, null, 2)); // Pretty print the JSON
      } else {
        setError('Invalid response format.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedReply)
      .then(() => {
        alert("Reply copied to clipboard!");
      })
      .catch((err) => {
        alert("Failed to copy text: " + err);
      });
  };

  // Styling for the input form container
  const formBoxStyle = {
    backgroundColor: '#fff', // Light background for the form
    borderRadius: '8px', // Rounded corners
    padding: '20px', // Padding inside the box
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Soft shadow for a lifted effect
    mb: 4, // Margin bottom for spacing
  };

  // Styling for the TextField and Select components
  const textFieldStyle = {
    mb: 2,
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ccc', // Lighter border color
      },
      '&:hover fieldset': {
        borderColor: '#888', // Hover border color
      },
      '&.Mui-focused fieldset': {
        borderColor: '#444', // Focused border color
      },
    },
    '& .MuiInputLabel-root': {
      color: '#444', // Darker label color
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#444', // Keep label dark when focused
    },
  };

  const selectStyle = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ccc', // Lighter border color
      },
      '&:hover fieldset': {
        borderColor: '#888', // Hover border color
      },
      '&.Mui-focused fieldset': {
        borderColor: '#444', // Focused border color
      },
    },
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'black' }}>
        Email Reply Generator
      </Typography>

      <Box sx={formBoxStyle}> {/* Apply custom styling to the form box */}
        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Original Email Content"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={textFieldStyle}
        />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={tone || ''}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}
            sx={selectStyle}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!emailContent || loading}
          fullWidth
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Reply"}
        </Button>
      </Box>

      {/* Generated Reply and Error Handling */}
      {generatedReply && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" sx={{ color: 'black' }}>
            Generated Reply:
          </Typography>
          <Typography sx={{ color: 'black', whiteSpace: 'pre-wrap' }}>
            {generatedReply}
          </Typography>

          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={handleCopyToClipboard}
          >
            Copy to Clipboard
          </Button>
        </Box>
      )}

      {error && (
        <Box sx={{ mt: 4 }}>
          <Typography sx={{ color: 'red' }}>
            {error}
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default App;
