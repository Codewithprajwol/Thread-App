const test=[
    { _id: 1, postId: "a", parentReplyId: null, text: "Main reply A" },
    { _id: 2, postId: "a", parentReplyId: 1, text: "Reply to A" },
    { _id: 3, postId: "a", parentReplyId: 2, text: "Reply to Reply A" },
    { _id: 4, postId: "a", parentReplyId: null, text: "Main reply B" }
  ]
  
export function buildReplyTree(flatReplies){
    const idToNodeMap={};
    const rootReplies=[];

    flatReplies.forEach((reply)=>{
        idToNodeMap[reply._id]={...reply,children:[]};
    })


    flatReplies.forEach((reply)=>{
        if(reply.parentReplyId){
            const parent=idToNodeMap[reply.parentReplyId];
            if(parent){
                parent.children.push(idToNodeMap[reply._id]);
            }
        }else{
            rootReplies.push(idToNodeMap[reply._id]);//consider this as root reply
        }
    })
  return rootReplies;

}

