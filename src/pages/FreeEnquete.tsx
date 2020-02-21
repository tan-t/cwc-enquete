import React, { useContext, useState } from 'react'
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonInput, IonItem, IonLabel, IonTextarea, IonSelect, IonSelectOption, IonFooter, IonButton } from '@ionic/react'
import { useHistory } from 'react-router'
import { Store } from '../base/Store'
import firebase from 'firebase'

const FreeEunquete = () => {

  const { store, dispatch } = useContext(Store)
  const [body, setBody] = useState('')

  const history = useHistory()

  const handleClick = async () => {
    await firebase.firestore().collection('comments').add(
      {
        owner: store.name,
        body,
        stage: store.stage,
        ownerId: store.user.uid,
        timestamp: new Date(Date.now()).toISOString()
      }
    )

    await firebase.firestore().collection('users').doc(store.user.uid).set(
      {
        name: store.name,
        stage: store.stage,
        id: store.user.uid
      }
    )


    history.push('/timeline')
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            内容へコメント
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
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
          <IonLabel>お名前 *</IonLabel>
          <IonInput value={store.name} onIonChange={(ev => dispatch({ type: 'setName', value: ev.detail.value }))}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>ご感想 </IonLabel>
          <IonTextarea autoGrow rows={7} value={body} onIonChange={ev => setBody(ev.detail.value || '')}></IonTextarea>
        </IonItem>
      </IonContent>
      <IonFooter>
        <IonButton expand="full" onClick={() => handleClick()}>コメントする！</IonButton>
      </IonFooter>
    </IonPage>
  )

}

export default FreeEunquete