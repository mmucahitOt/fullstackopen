import { useBookAdded } from "../graphql/queryHooks";

const SubscriptionHandler = () => {
  useBookAdded();
  return undefined;
};

export default SubscriptionHandler;