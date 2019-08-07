import app from '@server';
// import { logger } from '@shared';

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    console.info('Express server started on port: ' + port);
});
