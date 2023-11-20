// import React, { useRef, useState } from "react";
// import firebase from "firebase/app";
// import "firebase/firestore";
// import "firebase/auth";
// import "firebase/analytics";

// import { useAuthState } from "react-firebase-hooks/auth";
// import { useCollectionData } from "react-firebase-hooks/firestore";

// firebase.initializeApp({
//   apiKey: "AIzaSyBrdCrqUV5MWwdRWmkFRqcvuj1MN76l2qE",
//   authDomain: "media-8998c.firebaseapp.com",
//   projectId: "media-8998c",
//   storageBucket: "media-8998c.appspot.com",
//   messagingSenderId: "91482997431",
//   appId: "1:91482997431:web:77598b5772423823d64332",
// });

// const auth = firebase.auth();
// const firestore = firebase.firestore();
// const analytics = firebase.analytics();

// const Chat = () => {
//   function ChatRoom() {
//     const dummy = useRef();
//     const messagesRef = firestore.collection("messages");
//     const query = messagesRef.orderBy("createdAt").limit(25);

//     const [messages] = useCollectionData(query, { idField: "id" });

//     const [formValue, setFormValue] = useState("");

//     const sendMessage = async (e) => {
//       e.preventDefault();

//       const { uid, photoURL } = auth.currentUser;

//       await messagesRef.add({
//         text: formValue,
//         createdAt: firebase.firestore.FieldValue.serverTimestamp(),
//         uid,
//         photoURL,
//       });

//       setFormValue("");
//       dummy.current.scrollIntoView({ behavior: "smooth" });
//     };

//     return (
//       <>
//         <main>
//           {messages &&
//             messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

//           <span ref={dummy}></span>
//         </main>

//         <form onSubmit={sendMessage}>
//           <input
//             value={formValue}
//             onChange={(e) => setFormValue(e.target.value)}
//             placeholder="say something nice"
//           />

//           <button type="submit" disabled={!formValue}>
//             🕊️
//           </button>
//         </form>
//       </>
//     );
//   }

//   function ChatMessage(props) {
//     const { text, uid, photoURL } = props.message;

//     const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

//     return (
//       <>
//         <div className={`message ${messageClass}`}>
//           <img
//             src={
//               photoURL ||
//               "https://api.adorable.io/avatars/23/abott@adorable.png"
//             }
//           />
//           <p>{text}</p>
//         </div>
//       </>
//     );
//   }

//   return <div>Test</div>;
// };

// export default Chat;
