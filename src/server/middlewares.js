import Router from 'koa-router';
import { suscribeVisitor, changeEmailPreference } from './controller';

const router = new Router();
router.post('/on_visitor_suscribe/:email', async ctx => suscribeVisitor(ctx.params.email));
router.post('/on_visitor_preference_update/:email/:preference', async ctx =>
    changeEmailPreference(ctx.params.email, ctx.params.preference),
);
export default [router.routes(), router.allowedMethods()];
