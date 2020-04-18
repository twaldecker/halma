import MatomoTracker from 'matomo-tracker'

const tracker = new MatomoTracker(2, 'https://analytics.joomla-upgrade-service.de/matomo.php')

export const actions = {
  connect: "connect",
  disconnect: "disconnect",
  update: "update",
}

export default function track(user: string, action: string, room: string) {
  tracker.track({
    url: "https://wunderwald.games" + room,
    action_name: action,
    uid: user
  });
}
