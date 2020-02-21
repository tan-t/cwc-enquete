import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonFooter, IonItem, IonBackButton } from '@ionic/react'
import { logoTwitter, trash } from 'ionicons/icons'
import React, { useEffect, useContext, useState } from 'react'
import { Store } from '../base/Store'
import { useRouteMatch, useHistory } from 'react-router'
import firebase from 'firebase'

const CommentDetail = () => {
  const [comment, setComment] = useState<{ ownerId: string, owner: string, body: string, stage: string }>({
    ownerId: '',
    owner: '',
    body: '',
    stage: ''
  })
  const { store, dispatch } = useContext(Store)
  const { params } = useRouteMatch()
  const history = useHistory()

  useEffect(() => {
    const found = store.comments.find((c: any) => c.id === params.id)
    if (found) {
      setComment(found)
      return
    }

    firebase.firestore().collection('comments').doc(params.id).get().then(c => {
      const data = c.data()
      if (!data) {
        history.push('/timeline')
        return
      }
      setComment(data as any)
    })

  }, [store.user])

  const handleDelete = async () => {
    await firebase.firestore().collection('comments').doc(params.id).delete()
    history.push('/timeline')
  }

  const handleTweet = () => {
    const tweetFixed = "\n#circuswithoutcircle"
    const lengthLeft = 140 - (tweetFixed.length + 12)
    if (comment.body.length > lengthLeft) {
      return comment.body.slice(0, lengthLeft) + '…\n' + "https://cwc2020-2746f.firebaseapp.com/comments/" + params.id + tweetFixed
    }
    return comment.body + '\n' + "https://cwc2020-2746f.firebaseapp.com/comments/" + params.id + tweetFixed
  }

  return <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref="/timeline"></IonBackButton>
        </IonButtons>
        <IonTitle>
          コメント詳細
        </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent >
      <IonCard>
        <IonCardHeader>
          <IonCardSubtitle>@ {comment.ownerId}</IonCardSubtitle>
          <IonCardTitle>{comment.owner}</IonCardTitle>
        </IonCardHeader>

        <IonCardContent>
          <p> {
            comment.body
          }
          </p>
          <IonButton fill="outline" size="small" href={"https://twitter.com/intent/tweet?text=" + encodeURIComponent(handleTweet())}>
            <IonIcon icon={logoTwitter}></IonIcon>twitterで共有
        </IonButton>
          {
            comment.ownerId === store.user.uid && <IonButton fill="outline" color="danger" size="small" onClick={handleDelete}><IonIcon icon={trash}></IonIcon>削除する</IonButton>
          }
        </IonCardContent>

      </IonCard>


    </IonContent >
  </IonPage >
}

export default CommentDetail
