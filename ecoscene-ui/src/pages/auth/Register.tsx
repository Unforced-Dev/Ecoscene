import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Link as MuiLink,
  Avatar,
  IconButton,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { PhotoCamera } from '@mui/icons-material';

const steps = ['Basic Information', 'Values & Interests', 'Complete Profile'];

const geneKeys = Array.from({ length: 64 }, (_, i) => i + 1);
const humanDesignTypes = ['Generator', 'Manifesting Generator', 'Projector', 'Manifestor', 'Reflector'];
const enneagramTypes = Array.from({ length: 9 }, (_, i) => `Type ${i + 1}`);
const interests = [
  'Regenerative Agriculture',
  'Permaculture',
  'Holistic Health',
  'Sacred Medicine',
  'Community Building',
  'Ocean Conservation',
  'Renewable Energy',
  'Sustainable Fashion',
  'Zero Waste Living',
  'Forest Restoration',
];

export default function Register() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  
  // Form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    location: '',
    bio: '',
    selectedGeneKeys: [] as number[],
    humanDesign: '',
    enneagram: '',
    selectedInterests: [] as string[],
    avatar: '',
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    // Mock registration
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/');
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Full Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Location"
                  placeholder="City, State/Country"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </Grid>
            </Grid>
          </Box>
        );
      
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Your Values & Personality
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Gene Keys (Select up to 3)</InputLabel>
                  <Select
                    multiple
                    value={formData.selectedGeneKeys}
                    onChange={(e) => {
                      const value = e.target.value as number[];
                      if (value.length <= 3) {
                        setFormData({ ...formData, selectedGeneKeys: value });
                      }
                    }}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={`Key ${value}`} size="small" />
                        ))}
                      </Box>
                    )}
                  >
                    {geneKeys.map((key) => (
                      <MenuItem key={key} value={key}>
                        Gene Key {key}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Human Design Type</InputLabel>
                  <Select
                    value={formData.humanDesign}
                    onChange={(e) => setFormData({ ...formData, humanDesign: e.target.value })}
                  >
                    {humanDesignTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Enneagram Type</InputLabel>
                  <Select
                    value={formData.enneagram}
                    onChange={(e) => setFormData({ ...formData, enneagram: e.target.value })}
                  >
                    {enneagramTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Select Your Interests
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {interests.map((interest) => (
                    <Chip
                      key={interest}
                      label={interest}
                      onClick={() => {
                        const newInterests = formData.selectedInterests.includes(interest)
                          ? formData.selectedInterests.filter((i) => i !== interest)
                          : [...formData.selectedInterests, interest];
                        setFormData({ ...formData, selectedInterests: newInterests });
                      }}
                      color={formData.selectedInterests.includes(interest) ? 'primary' : 'default'}
                      variant={formData.selectedInterests.includes(interest) ? 'filled' : 'outlined'}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Complete Your Profile
            </Typography>
            <Grid container spacing={3}>
              <Grid size={12} sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{ width: 100, height: 100, margin: '0 auto', mb: 2 }}
                  src={formData.avatar}
                />
                <IconButton color="primary" component="label">
                  <input hidden accept="image/*" type="file" />
                  <PhotoCamera />
                </IconButton>
                <Typography variant="body2" color="text.secondary">
                  Upload Profile Photo
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Bio"
                  placeholder="Tell us about yourself and your connection to regenerative practices..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  By creating an account, you agree to ECOSCENE's values of kindness, respect, and regenerative stewardship.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        );
      
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box sx={{ mt: 2, mb: 2 }}>
        {renderStepContent(activeStep)}
      </Box>
      
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Back
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        {activeStep === steps.length - 1 ? (
          <Button onClick={handleSubmit} variant="contained">
            Create Account
          </Button>
        ) : (
          <Button onClick={handleNext} variant="contained">
            Next
          </Button>
        )}
      </Box>
      
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2">
          Already have an account?{' '}
          <MuiLink component={Link} to="/login">
            Sign In
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
}