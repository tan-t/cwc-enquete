import { IonButton, IonCheckbox, IonContent, IonFooter, IonHeader, IonImg, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/react';
import React, { useContext } from 'react';
import { useHistory } from 'react-router';
import { Store } from '../base/Store';
import './Scene.css';
import firebase from 'firebase'

const Scene: React.FC = () => {

  const { store, dispatch } = useContext(Store)

  const history = useHistory()

  const handleClick = async () => {
    const user = store.user
    console.log(store.favorites)
    await firebase.firestore().collection('favorite').doc(user.uid).set(
      { favorites: store.favorites }
    )
    history.push('/scenes/complete')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/scenes"></IonBackButton>
          </IonButtons>
          <IonTitle>気に入ったシーン</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>ご来場の回 *</IonLabel>
            <IonSelect value={store.stage} onIonChange={(ev) => dispatch({ type: 'setStage', value: ev.detail.value })}>
              <IonSelectOption value="23(日)14:00">23(日) 14:00</IonSelectOption>
              <IonSelectOption value="23(日)18:30">23(日) 18:30</IonSelectOption>
              <IonSelectOption value="24(月)13:00">24(月) 13:00</IonSelectOption>
              <IonSelectOption value="24(月)17:00">24(月) 17:00</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonCheckbox checked={store.favorites.includes(1)} onIonChange={(ev) => dispatch({ type: 'addFavorite', value: { scene: 1, checked: ev.detail.checked } })}></IonCheckbox>
            <IonLabel>
              <IonImg src="assets/chapter-1.jpg"></IonImg>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox checked={store.favorites.includes(2)} onIonChange={(ev) => dispatch({ type: 'addFavorite', value: { scene: 2, checked: ev.detail.checked } })}></IonCheckbox>
            <IonLabel>
              <IonImg src="assets/chapter-2.jpg"></IonImg>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox checked={store.favorites.includes(3)} onIonChange={(ev) => dispatch({ type: 'addFavorite', value: { scene: 3, checked: ev.detail.checked } })}></IonCheckbox>
            <IonLabel>
              <IonImg src="assets/chapter-3.jpg"></IonImg>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox checked={store.favorites.includes(5)} onIonChange={(ev) => dispatch({ type: 'addFavorite', value: { scene: 5, checked: ev.detail.checked } })}></IonCheckbox>
            <IonLabel>
              <IonImg src="assets/chapter-5.jpg"></IonImg>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox checked={store.favorites.includes(6)} onIonChange={(ev) => dispatch({ type: 'addFavorite', value: { scene: 6, checked: ev.detail.checked } })}></IonCheckbox>
            <IonLabel>
              <IonImg src="assets/chapter-6.jpg"></IonImg>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox checked={store.favorites.includes(7)} onIonChange={(ev) => dispatch({ type: 'addFavorite', value: { scene: 7, checked: ev.detail.checked } })}></IonCheckbox>
            <IonLabel>
              <IonImg src="assets/chapter-7.jpg"></IonImg>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonCheckbox checked={store.favorites.includes(8)} onIonChange={(ev) => dispatch({ type: 'addFavorite', value: { scene: 8, checked: ev.detail.checked } })}></IonCheckbox>

            <IonLabel>
              <IonImg src="assets/chapter-8.jpg"></IonImg>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <IonFooter>
        <IonButton expand="full" onClick={handleClick}>投票する！</IonButton>
      </IonFooter>
    </IonPage>
  );
};

export default Scene;
