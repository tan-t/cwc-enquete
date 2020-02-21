import { IonCard, IonCardContent, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonBackButton, IonButtons } from '@ionic/react'
import React from 'react'

const FreeEnqueteComplete = () => {
  return (<IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/free-enquete"></IonBackButton>
        </IonButtons>
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
        </IonCardContent>
      </IonCard>
    </IonContent>
  </IonPage>)
}

export default FreeEnqueteComplete