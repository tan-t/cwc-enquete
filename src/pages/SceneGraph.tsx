import { useState, useEffect } from "react"
import firebase from 'firebase'
import React from "react"
import ReactMinimalPieChart from 'react-minimal-pie-chart'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon } from "@ionic/react"
import { add } from "ionicons/icons"
import './SceneGraph.css'

const initialState = [
  { title: '1.乱数調整', color: '#3454D1', value: 0 },
  { title: '2.三太陽の日', color: '#5B2A86', value: 0 },
  { title: '3.災害', color: '#7785AC', value: 0 },
  { title: '4.夜明け', color: '#9AC6C5', value: 0 },
  { title: '5.静かだ', color: '#A5E6BA', value: 0 },
  { title: '6.カーゴ・カルト', color: '#CFDBD5', value: 0 },
  { title: '7.(2.)三太陽の日', color: '#E8EDDF', value: 0 },
  { title: '8.約束', color: '#F5CB5C', value: 0 }]

const interpret = (docs: readonly { favorites: (1 | 2 | 3 | 4 | 5 | 6 | 7 | 8)[] }[]) => {
  return docs.reduce((res, doc) => {
    doc.favorites.forEach((favorite) => {
      res[favorite - 1].value = ++res[favorite - 1].value
    })
    return res
  },
    [
      { title: '1.乱数調整', color: '#3454D1', value: 0 },
      { title: '2.三太陽の日', color: '#5B2A86', value: 0 },
      { title: '3.災害', color: '#7785AC', value: 0 },
      { title: '4.夜明け', color: '#9AC6C5', value: 0 },
      { title: '5.静かだ', color: '#A5E6BA', value: 0 },
      { title: '6.カーゴ・カルト', color: '#CFDBD5', value: 0 },
      { title: '7.(2.)三太陽の日', color: '#E8EDDF', value: 0 },
      { title: '8.約束', color: '#F5CB5C', value: 0 }])
}

const SceneGraph = () => {
  const [state, setState] = useState<any[] | false>(false)

  useEffect(() => {
    return firebase.firestore().collection('favorite').onSnapshot((snap) => {
      setState(interpret(snap.docs.map(d => d.data()) as any[]))
    })
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            みんなのお気に入り
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {
          state && <ReactMinimalPieChart
            animate={true}
            data={state}
            animationDuration={500}
            animationEasing="ease-out"
            lengthAngle={360}
            lineWidth={100}
            radius={50}
            cx={50}
            cy={50}
            label={false}
            viewBoxSize={[100, 100]}
          />
        }
        <div>
          {
            initialState.map(i => (
              <div className="legend-row"><div className="legend-color" style={{ backgroundColor: i.color }}></div><div className="legend-title">{i.title}</div></div>
            ))
          }
        </div>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton routerLink="/scenes/new">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );

}

export default SceneGraph