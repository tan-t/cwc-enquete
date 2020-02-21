import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/typography.css';
import { chatboxes, star } from 'ionicons/icons';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { Provider } from './base/Store';
import FreeEnquete from './pages/FreeEnquete';
import FreeEnqueteComplete from './pages/FreeEnqueteComplete';
import Scene from './pages/Scene';
import SceneCompolete from './pages/SceneComplete';
import Timeline from './pages/Timeline';
/* Theme variables */
import './theme/variables.css';
import CommentDetail from './pages/CommentDetail';
import SceneGraph from './pages/SceneGraph';






const App: React.FC = () => {

  return <IonApp>
    <Provider>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/scenes/new" component={Scene} />
            <Route path="/scenes" component={SceneGraph} exact />
            <Route path="/timeline" component={Timeline} exact={true} />
            <Route path="/timeline/new" component={FreeEnquete} />
            <Route path="/comments/:id" component={CommentDetail} />
            <Route path="/scenes/complete" component={SceneCompolete} />
            <Route path="/free-enquete/complete" component={FreeEnqueteComplete} />
            <Route exact path="/" render={() => <Redirect to="/timeline" />} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="free-enquete" href="/timeline">
              <IonIcon icon={chatboxes} />
              <IonLabel>コメント</IonLabel>
            </IonTabButton>
            <IonTabButton tab="home" href="/scenes">
              <IonIcon icon={star} />
              <IonLabel>シーン投票</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </Provider>
  </IonApp>
};

export default App;
