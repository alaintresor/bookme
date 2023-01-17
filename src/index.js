import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
