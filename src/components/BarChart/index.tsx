import {Line} from 'react-chartjs-2'
import {useEffect} from 'react';
import firebase from "../../services/firebase"


type BarChartType ={
    listType:string;
}

export function BarChart({
    listType,
}:BarChartType){
    // const metrics = Api.getMetrics(listType); 
    const labels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun','Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    let current = new Date();
    let year = current.getFullYear();
    const listdata = new Array();
   const unsub = firebase.database().ref(`/Metricas/${listType}/${year}`)
    unsub.on('value',(lista)=>{
        const database = lista.val();
        if(database !== null) {
            Object.entries(database).map(([key,value])=>{
                listdata.push(value)
            })
        }else{
            console.log(undefined)
        }
    })
    console.log(listType)



    return(      
        <div>
            <Line
                data={{
                    labels: labels,
                datasets: [
                        {
                            label: listType,
                            data: listdata,
                            backgroundColor: '#ffff',
                            borderColor: '#ffff',
                        },
                    ],
                }}
                height={500}
                width={600}
                options={{
                    maintainAspectRatio: false,
                }
            }
            />
        </div>)

    // switch(listType){
    //     case 'Vídeo':
    //         return(      
    //             <div>
    //                 <Line
    //                     data={{
    //                         labels: labels,
    //                     datasets: [

    //                             {
    //                                 label: 'Vídeo',
    //                                 data: listdata,
    //                                 backgroundColor: '#027f81',
    //                                 borderColor: '#027f81',
    //                             },
    //                         ],
    //                     }}
    //                     height={500}
    //                     width={600}
    //                     options={{
    //                         maintainAspectRatio: false,
    //                     }
    //                 }
    //                 />
    //             </div>)

    //     case 'Midia Social':
    //         return(      
    //             <div>
    //                 <Line
    //                     data={{
    //                         labels: labels,
    //                     datasets: [
    //                             {
    //                                 label: 'Mídia Social',
    //                                 data:listdata,
    //                                 backgroundColor: '#0096cc',
    //                                 borderColor: '#0096cc',
    //                             },
    //                         ],
    //                     }}
    //                     height={500}
    //                     width={600}
    //                     options={{
    //                         maintainAspectRatio: false,
    //                     }
    //                 }
    //                 />
    //             </div>)

    //     case "Marketing":
    //         return(      
    //             <div>
    //                 <Line
    //                     data={{
    //                         labels: labels,
    //                     datasets: [

    //                             {
    //                                 label: 'Marketing',
    //                                 data:listdata,
    //                                 backgroundColor: '#0F00EB',
    //                                 borderColor: '#0F00EB',
    //                             },
    //                         ],
    //                     }}
    //                     height={500}
    //                     width={600}
    //                     options={{
    //                         maintainAspectRatio: false,
    //                     }
    //                 }
    //                 />
    //             </div>)

    //     case "Impressão em Papel":
    //         return(      
    //             <div>
    //                 <Line
    //                     data={{
    //                         labels: labels,
    //                     datasets: [
    //                             {
    //                                 label: 'Impressao em Papel',
    //                                 data: listdata,
    //                                 backgroundColor: '#00be53',
    //                                 borderColor: '#00be53',
    //                             },
    //                         ],
    //                     }}
    //                     height={500}
    //                     width={600}
    //                     options={{
    //                         maintainAspectRatio: false,
    //                     }
    //                 }
    //                 />
    //             </div>)

    //     case "Fotografia":
    //         return(      
    //             <div>
    //                 <Line
    //                     data={{
    //                         labels: labels,
    //                     datasets: [
    //                             {
    //                                 label: 'Fotografia',
    //                                 data: listdata,
    //                                 backgroundColor: '#00c58d',
    //                                 borderColor: '#00c58d',
    //                             },
    //                         ],
    //                     }}
    //                     height={500}
    //                     width={600}
    //                     options={{
    //                         maintainAspectRatio: false,
    //                     }
    //                 }
    //                 />
    //             </div>)
    //     case "Design Gráfico":
    //         return(      
    //             <div>
    //                 <Line
    //                     data={{
    //                         labels: labels,
    //                     datasets: [
    //                             {
    //                                 label: 'Design Gráfico',
    //                                 data: listdata,
    //                                 backgroundColor: '#0CAEE8',
    //                                 borderColor: '#0CAEE8',
    //                             },
    //                         ],
    //                     }}
    //                     height={500}
    //                     width={600}
    //                     options={{
    //                         maintainAspectRatio: false,
    //                     }
    //                 }
    //                 />
    //             </div>)

    //     case 'Desenvolvimento Web e T.I':
    //         return(      
    //             <div>
    //                 <Line
    //                     data={{
    //                         labels: labels,
    //                     datasets: [
    //                             {
    //                                 label: 'Desenvolvimento Web e T.I',
    //                                 data: listdata,
    //                                 backgroundColor: '#0B6FDE',
    //                                 borderColor: '#0B6FDE',
    //                             },
    //                         ],
    //                     }}
    //                     height={500}
    //                     width={600}
    //                     options={{
    //                         maintainAspectRatio: false,
    //                     }
    //                 }
    //                 />
    //             </div>)

    //     case 'Assessoria de Imprensa':
    //     default:
    //         return(      
    //         <div>
    //             <Line
    //                 data={{
    //                     labels: labels,
    //                 datasets: [
    //                         {
    //                             label: 'Assessoria de Imprensa',
    //                             data: listdata,
    //                             backgroundColor: '#ffff',
    //                             borderColor: '#ffff',
                                
    //                         }
    //                     ],
    //                 }}
    //                 height={500}
    //                 width={600}
    //                 options={{
    //                     maintainAspectRatio: false,
    //                 }
    //             }
    //             />
    //         </div>)
    // }

}