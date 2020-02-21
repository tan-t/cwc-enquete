import { IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonBackButton, IonButtons, IonButton } from '@ionic/react'
import React from 'react'

const SceneCompolete = () => {
  return (<IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>
          ありがとうございます！
      </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonCard>
        <IonImg src="assets/shapes.svg"></IonImg>
        <IonCardContent>
          <p>投票が完了しました！ありがとうございます。</p>
          <IonButton routerLink='/scenes'>
            もどる
          </IonButton>
        </IonCardContent>
      </IonCard>
    </IonContent>
  </IonPage>)
}

export default SceneCompolete