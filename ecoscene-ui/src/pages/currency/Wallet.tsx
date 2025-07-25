import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Divider,
  Alert,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  AccountBalanceWallet,
  Send,
  CallReceived,
  SwapHoriz,
  Info,
  Nature,
  Favorite,
  Star,
  QrCode,
  ContentCopy,
  Check,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import { mockUsers } from '../../mocks/data';

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'purchase' | 'reward' | 'exchange';
  currency: 'V' | 'Y' | 'Q';
  amount: number;
  from: string;
  to: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'pending';
}

const mockTransactions: Transaction[] = [
  {
    id: 't1',
    type: 'receive',
    currency: 'V',
    amount: 50,
    from: 'Community Garden Project',
    to: 'You',
    description: 'Reward for volunteer work',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
  },
  {
    id: 't2',
    type: 'send',
    currency: 'Y',
    amount: 25,
    from: 'You',
    to: 'Michael Rivers',
    description: 'Payment for healing session',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
  },
  {
    id: 't3',
    type: 'purchase',
    currency: 'V',
    amount: 15,
    from: 'You',
    to: 'Conscious Foods Coop',
    description: 'Organic Heritage Tomato Seeds',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
  },
  {
    id: 't4',
    type: 'reward',
    currency: 'Q',
    amount: 10,
    from: 'ECOSCENE Platform',
    to: 'You',
    description: 'Monthly active user reward',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
  },
];

const currencyInfo = {
  V: {
    name: 'Yin Currency',
    description: 'Community currency with demurrage for local exchange',
    icon: <Nature />,
    color: 'primary',
    exchangeRate: 0.9,
  },
  Y: {
    name: 'Yang Currency',
    description: 'Gift currency for rewarding positive actions',
    icon: <Favorite />,
    color: 'warning',
    exchangeRate: 1.0,
  },
  Q: {
    name: 'Equity Tokens',
    description: 'Platform ownership and governance tokens',
    icon: <Star />,
    color: 'secondary',
    exchangeRate: 10.0,
  },
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Wallet() {
  const user = useSelector((state: RootState) => state.auth.user) || mockUsers[0];
  const [tabValue, setTabValue] = useState(0);
  const [sendDialogOpen, setSendDialogOpen] = useState(false);
  const [exchangeDialogOpen, setExchangeDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const [sendForm, setSendForm] = useState({
    currency: 'V' as 'V' | 'Y' | 'Q',
    amount: '',
    recipient: '',
    description: '',
  });

  const [exchangeForm, setExchangeForm] = useState({
    fromCurrency: 'V' as 'V' | 'Y' | 'Q',
    toCurrency: 'Y' as 'V' | 'Y' | 'Q',
    amount: '',
  });

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleSend = () => {
    // In real app, would process transaction
    setSendDialogOpen(false);
    setSendForm({ currency: 'V', amount: '', recipient: '', description: '' });
  };

  const handleExchange = () => {
    // In real app, would process exchange
    setExchangeDialogOpen(false);
    setExchangeForm({ fromCurrency: 'V', toCurrency: 'Y', amount: '' });
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`ecoscene:${user.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'send':
        return <Send />;
      case 'receive':
        return <CallReceived />;
      case 'exchange':
        return <SwapHoriz />;
      default:
        return <AccountBalanceWallet />;
    }
  };

  const getExchangeAmount = () => {
    if (!exchangeForm.amount) return 0;
    const fromRate = currencyInfo[exchangeForm.fromCurrency].exchangeRate;
    const toRate = currencyInfo[exchangeForm.toCurrency].exchangeRate;
    return (parseFloat(exchangeForm.amount) * fromRate / toRate).toFixed(2);
  };

  return (
    <Box>
      {/* Wallet Overview */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5">Wallet Overview</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              startIcon={<Send />}
              onClick={() => setSendDialogOpen(true)}
            >
              Send
            </Button>
            <Button
              variant="outlined"
              startIcon={<SwapHoriz />}
              onClick={() => setExchangeDialogOpen(true)}
            >
              Exchange
            </Button>
          </Box>
        </Box>

        <Grid spacing={3}>
          {Object.entries(currencyInfo).map(([key, info]) => {
            const currency = key as 'V' | 'Y' | 'Q';
            const balance = user.currencies[currency];
            const percentOfMax = (balance / 5000) * 100;

            return (
              <Grid size={{ xs: 12, md: 4 }} key={currency}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: `${info.color}.light`, mr: 2 }}>
                        {info.icon}
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6">{info.name}</Typography>
                        <Typography variant="h4">{balance} {currency}</Typography>
                      </Box>
                      <IconButton size="small">
                        <Info />
                      </IconButton>
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {info.description}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption">Balance</Typography>
                        <Typography variant="caption">≈ ${(balance * info.exchangeRate).toFixed(2)} USD</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={percentOfMax}
                        color={info.color as any}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Paper>

      {/* Receive Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Receive Payments
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <QrCode sx={{ fontSize: 100 }} />
          <Box>
            <Typography variant="body1" gutterBottom>
              Your wallet address:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip label={`ecoscene:${user.id}`} />
              <IconButton size="small" onClick={handleCopyAddress}>
                {copied ? <Check color="success" /> : <ContentCopy />}
              </IconButton>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Share this address to receive payments
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Transaction History */}
      <Paper sx={{ p: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="All Transactions" />
          <Tab label="V Currency" />
          <Tab label="Y Currency" />
          <Tab label="Q Tokens" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <List>
            {mockTransactions.map((transaction) => (
              <React.Fragment key={transaction.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{
                      bgcolor: transaction.type === 'receive' || transaction.type === 'reward'
                        ? 'success.light'
                        : 'grey.300'
                    }}>
                      {getTransactionIcon(transaction.type)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body1">
                          {transaction.description}
                        </Typography>
                        <Typography
                          variant="body1"
                          color={transaction.type === 'receive' || transaction.type === 'reward' ? 'success.main' : 'text.primary'}
                        >
                          {transaction.type === 'receive' || transaction.type === 'reward' ? '+' : '-'}
                          {transaction.amount} {transaction.currency}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          {transaction.type === 'receive' || transaction.type === 'reward'
                            ? `From: ${transaction.from}`
                            : `To: ${transaction.to}`}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(transaction.timestamp).toLocaleString()}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>
        </TabPanel>

        {['V', 'Y', 'Q'].map((currency, index) => (
          <TabPanel value={tabValue} index={index + 1} key={currency}>
            <List>
              {mockTransactions
                .filter(t => t.currency === currency)
                .map((transaction) => (
                  <React.Fragment key={transaction.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{
                          bgcolor: transaction.type === 'receive' || transaction.type === 'reward'
                            ? 'success.light'
                            : 'grey.300'
                        }}>
                          {getTransactionIcon(transaction.type)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={transaction.description}
                        secondary={new Date(transaction.timestamp).toLocaleString()}
                      />
                      <Typography
                        variant="body1"
                        color={transaction.type === 'receive' || transaction.type === 'reward' ? 'success.main' : 'text.primary'}
                      >
                        {transaction.type === 'receive' || transaction.type === 'reward' ? '+' : '-'}
                        {transaction.amount} {transaction.currency}
                      </Typography>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
            </List>
          </TabPanel>
        ))}
      </Paper>

      {/* Send Dialog */}
      <Dialog open={sendDialogOpen} onClose={() => setSendDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Send Currency</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
            <InputLabel>Currency</InputLabel>
            <Select
              value={sendForm.currency}
              onChange={(e) => setSendForm({ ...sendForm, currency: e.target.value as 'V' | 'Y' | 'Q' })}
              label="Currency"
            >
              <MenuItem value="V">V - Yin Currency (Balance: {user.currencies.V})</MenuItem>
              <MenuItem value="Y">Y - Yang Currency (Balance: {user.currencies.Y})</MenuItem>
              <MenuItem value="Q">Q - Equity Tokens (Balance: {user.currencies.Q})</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={sendForm.amount}
            onChange={(e) => setSendForm({ ...sendForm, amount: e.target.value })}
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            label="Recipient (username or wallet address)"
            value={sendForm.recipient}
            onChange={(e) => setSendForm({ ...sendForm, recipient: e.target.value })}
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            label="Description (optional)"
            value={sendForm.description}
            onChange={(e) => setSendForm({ ...sendForm, description: e.target.value })}
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSendDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSend} variant="contained">
            Send
          </Button>
        </DialogActions>
      </Dialog>

      {/* Exchange Dialog */}
      <Dialog open={exchangeDialogOpen} onClose={() => setExchangeDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Exchange Currency</DialogTitle>
        <DialogContent>
          <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
            Exchange rates are based on current market values. A 2% fee applies to all exchanges.
          </Alert>
          
          <Grid spacing={2}>
            <Grid size={{ xs: 5 }}>
              <FormControl fullWidth>
                <InputLabel>From</InputLabel>
                <Select
                  value={exchangeForm.fromCurrency}
                  onChange={(e) => setExchangeForm({ ...exchangeForm, fromCurrency: e.target.value as 'V' | 'Y' | 'Q' })}
                  label="From"
                >
                  <MenuItem value="V">V Currency</MenuItem>
                  <MenuItem value="Y">Y Currency</MenuItem>
                  <MenuItem value="Q">Q Tokens</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 2 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SwapHoriz />
            </Grid>
            <Grid size={{ xs: 5 }}>
              <FormControl fullWidth>
                <InputLabel>To</InputLabel>
                <Select
                  value={exchangeForm.toCurrency}
                  onChange={(e) => setExchangeForm({ ...exchangeForm, toCurrency: e.target.value as 'V' | 'Y' | 'Q' })}
                  label="To"
                >
                  <MenuItem value="V">V Currency</MenuItem>
                  <MenuItem value="Y">Y Currency</MenuItem>
                  <MenuItem value="Q">Q Tokens</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={exchangeForm.amount}
            onChange={(e) => setExchangeForm({ ...exchangeForm, amount: e.target.value })}
            sx={{ mt: 2, mb: 2 }}
          />
          
          {exchangeForm.amount && (
            <Alert severity="success">
              You will receive approximately {getExchangeAmount()} {exchangeForm.toCurrency}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExchangeDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleExchange} variant="contained">
            Exchange
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}