import 'dotenv/config';
import Router from 'koa-router';
import { suscribeVisitor, changeEmailPreference } from './controller';

const router = new Router();
router.post('/on_visitor_suscribe/:email', async (ctx) => {
    await suscribeVisitor(ctx.params.email);
    ctx.status = 200;
});
router.post('/on_visitor_preference_update/:email/:preference', async (ctx) => {
    await changeEmailPreference(ctx.params.email, ctx.params.preference);
    ctx.status = 200;
});
export default [router.routes(), router.allowedMethods()];
