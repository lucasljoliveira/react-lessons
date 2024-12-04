// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventDetailPage, { loader as eventDetailLoader, action as eventDeleteAction } from './pages/EventDetailPage';
import NewEventPage from './pages/NewEventPage';
import EditEventPage from './pages/EditEventPage';
import RootLayout from './components/RootLayout';
import { action as manipulatedEventAction } from './components/EventForm'
import EventRootLayout from './components/EventRootLayout';
import Error from './pages/Error';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "events", element: <EventRootLayout />, children: [
        { index: true, element: <EventsPage />, loader: eventsLoader },
        { path: ":id", id: "event-detail", loader: eventDetailLoader, children: [
          { index: true, element: <EventDetailPage />, action: eventDeleteAction },
          { path: "edit", element: <EditEventPage />, action: manipulatedEventAction },
        ]},
        { path: "new", element: <NewEventPage />, action: manipulatedEventAction },
      ]},
      {
        path: 'newsletter',
        element: <NewsletterPage />,
        action: newsletterAction,
      },
    ]
  },
])

function App() {
  return <RouterProvider router={router}>
    <div></div>
  </RouterProvider>
}

export default App;
