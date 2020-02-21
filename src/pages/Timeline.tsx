import React, { useEffect, useContext } from 'react'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonFab, IonFabButton, IonIcon, IonImg, IonItemSliding, IonItemOptions, IonItemOption, IonAlert } from "@ionic/react"
import { add } from 'ionicons/icons'
import { Store } from '../base/Store'
import firebase from 'firebase'

const Timeline = () => {

  const { store, dispatch } = useContext(Store)

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('comments').onSnapshot((data) => {
      data.query.orderBy('timestamp', 'desc').get().then(sorted => {
        dispatch({ type: 'setComments', value: sorted.docs.map(d => ({ ...d.data(), id: d.id })) })
      })
    })

    return unsubscribe
  }, [store.user])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            みんなのコメント
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <IonList>
          {
            store.comments.map((comment: any) => (
              <IonItemSliding key={comment.id}>
                <IonItem routerLink={'/comments/' + comment.id}>
                  <IonLabel>
                    <p>
                      {
                        comment.owner
                      } > {
                        comment.stage
                      } @{
                        comment.ownerId
                      }
                    </p>
                    {
                      comment.body
                    }
                  </IonLabel>
                </IonItem>
              </IonItemSliding>
            ))
          }
        </IonList>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/timeline/new">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  )
}

export default Timeline