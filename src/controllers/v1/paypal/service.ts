import { convertToSingleQuotes, executeStatement } from '#apis/aws/dynamoDB/index';
import { type PaypalEventParsedPayloadI, type PaypalEventPayloadI } from '#types';
import BaseDalService from '#services/BaseDalService';

enum WebhookEventType {
  BILLING_SUBSCRIPTION_CANCELLED = 'BILLING.SUBSCRIPTION.CANCELLED',
  BILLING_SUBSCRIPTION_ACTIVATED = 'BILLING.SUBSCRIPTION.ACTIVATED',
  BILLING_SUBSCRIPTION_SUSPENDED = 'BILLING.SUBSCRIPTION.SUSPENDED',
  BILLING_SUBSCRIPTION_UPDATED = 'BILLING.SUBSCRIPTION.UPDATED',
}

class PaypalService extends BaseDalService {
  constructor() {
    super('USERS');
  }

  async handleWebhook<T extends PaypalEventPayloadI>(event: T): Promise<void> {
    switch (event.event_type) {
      case WebhookEventType.BILLING_SUBSCRIPTION_CANCELLED:
        return this.handleSubscriptionCancelled(event);
      case WebhookEventType.BILLING_SUBSCRIPTION_ACTIVATED:
        return this.handleSubscriptionActivated(event);
      case WebhookEventType.BILLING_SUBSCRIPTION_SUSPENDED:
        return this.handleSubscriptionSuspended(event);
      case WebhookEventType.BILLING_SUBSCRIPTION_UPDATED:
        return this.handleSubscriptionUpdated(event);
      default:
        console.log('Unknown event type');
    }
  }

  async handleSubscriptionCancelled(event: any): Promise<void> {
    console.log('Cancelling subscription');
    const { subscription_id } = this.parseEventPayload(event);
    await this.cleanUpSubscription(subscription_id);
  }

  handleSubscriptionActivated(event: any): void {
    console.log('Activating subscription');
    console.log('event :', event);
  }

  async handleSubscriptionSuspended(event: any): Promise<void> {
    console.log('Suspending subscription');
    const { subscription_id } = this.parseEventPayload(event);
    await this.cleanUpSubscription(subscription_id);
  }

  handleSubscriptionUpdated(event: any): void {
    console.log('Updating subscription');
    console.log('event :', event);
  }

  parseEventPayload<T extends PaypalEventPayloadI>(payload: T): PaypalEventParsedPayloadI {
    const {
      event_type, summary, resource: {
        id,
        plan_id,
        quantity,
      },
    } = payload;
    return {
      event_type,
      summary,
      subscription_id: id,
      plan_id,
      quantity,
    };
  }

  async getUserIdBySubscriptionId(subscription_id): Promise<string> {
    const results = await executeStatement(`SELECT id FROM ${this.tableName} WHERE subscription_id=${convertToSingleQuotes(subscription_id)}`);
    return results[0]?.id;
  }

  async cleanUpSubscription(subscription_id: string): Promise<void> {
    console.log('Cleaning up subscription');
    const user_id = await this.getUserIdBySubscriptionId(subscription_id);
    if (user_id) {
      await executeStatement(`UPDATE ${this.tableName} SET is_active=false WHERE id=${convertToSingleQuotes(user_id)}`);
    }
  }
}

export default new PaypalService();
