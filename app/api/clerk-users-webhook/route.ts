import { db } from '@/lib/db';
import { WebhookEvent } from '@clerk/backend';
import { Webhook } from 'svix';

const validatePayload = async (
  req: Request,
): Promise<WebhookEvent | undefined> => {
  const payload = await req.text();
  const svixHeaders = {
    'svix-id': req.headers.get('svix-id')!,
    'svix-timestamp': req.headers.get('svix-timestamp')!,
    'svix-signature': req.headers.get('svix-signature')!,
  };

  const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

  try {
    const event = webhook.verify(payload, svixHeaders) as WebhookEvent;
    return event;
  } catch (error) {
    console.log('Error verifying webhook', error);
    return;
  }
};

export async function POST(req: Request, res: Response) {
  const event = await validatePayload(req);
  if (!event) {
    return new Response('Invalid webhook', { status: 400 });
  }

  switch (event.type) {
    case 'user.created': {
      const user = await db.user.findUnique({
        where: {
          clerkId: event.data.id,
        },
      });
      if (user) {
        console.log(`Updating user ${event.data.id} with  ${event.data}`);
      }
    }
    case 'user.updated': {
      console.log(`Creating/Updating user: ${event.data.id}`);

      await db.user.create({
        data: {
          username: `${event.data.first_name}${event.data.last_name}`,
          imageUrl: event.data.image_url,
          clerkId: event.data.id,
          email: event.data.email_addresses[0].email_address,
        },
      });
      break;
    }
    default: {
      console.log(`Clerk webhook event not supported: ${event.type}`);
    }
  }

  return new Response(null, { status: 200 });
}
