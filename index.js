function showAlert() {
    alert("Please enter your name in the top right textbox to add comment");
}

function changeColorToGreen() {
    const userNameElement = findElementById("userName");
    if(userNameElement.value != "")
        userNameElement.style.border = "2px solid green";
    else
        userNameElement.style.border = "2px solid red";
}

function addComment() {
    const userNameElement = findElementById("userName");
    const userName = userNameElement.value;
    const commentTextboxElement = findElementById("writeCommentHere");
    const comment = commentTextboxElement.value;
    if(userName != "" && comment != "") {
        createANewComment(userName, comment, "new", "");
    }
    else {
        alert("Please enter both username and comment to share");
    }
}

function createANewComment(userName, comment, type, previousCommentDiv) {
    let likes = 0;
    let dislikes = 0;   
    const outerDivForComment = createElement("div");
    const spaceAndContentDiv = createElement("div");
    spaceAndContentDiv.style.display = "flex";
    const spaceInTheBeginningDiv = createElement("div");
    if(type === "reply") {
        spaceInTheBeginningDiv.style.width = "30px";
    }
    spaceAndContentDiv.appendChild(spaceInTheBeginningDiv);
    
    const date = new Date();
    const displayCommentAreaElement = findElementById("displayCommentArea");
    const mediaBlockDiv = createElement("div");
    mediaBlockDiv.setAttribute("class", "media-block");
    spaceAndContentDiv.appendChild(mediaBlockDiv);
    outerDivForComment.appendChild(spaceAndContentDiv);
    

    const mediaBodyElement = createElement("div");
    mediaBodyElement.setAttribute("class", "media-body");
    const nameAndTimeStampDiv = createElement("div");
    nameAndTimeStampDiv.setAttribute("class", "mar-btm");

    const nameElement = createElement("p");
    nameElement.setAttribute("class", "text-semibold media-heading box-inline font-weight-bold");
    nameElement.innerHTML = userName;

    const timeStampElement = createElement("p");
    timeStampElement.setAttribute("class", "text-muted text-sm");
    timeStampElement.innerHTML = date;

    const commentParaElement = createElement("p");
    commentParaElement.innerHTML = comment;

    const likeDislikeReplyDiv = createElement("div");
    likeDislikeReplyDiv.setAttribute("class", "pad-ver");

    //to display number of likes
    const numberOfLikes = createElement("span");
    numberOfLikes.setAttribute("class", "tag tag-sm");
    const numberOfLikesIcon = createElement("i");
    numberOfLikesIcon.setAttribute("class", "fa fa-heart text-danger");
    numberOfLikes.style.display = "none";
    numberOfLikes.appendChild(numberOfLikesIcon);
    const displayLikesHereDiv = createElement("span");
    numberOfLikes.appendChild(displayLikesHereDiv);

    //to display number of dislikes
    const numberOfDislikes = createElement("span");
    numberOfDislikes.setAttribute("class", "tag tag-sm");
    numberOfDislikes.style.display = "none";
    const displayDislikesHereDiv = createElement("span");
    numberOfDislikes.appendChild(displayDislikesHereDiv);
    
    const likeDislikeButtonDiv = createElement("div");
    likeDislikeButtonDiv.setAttribute("class","btn-group");

    const likeButton = createElement("button");
    likeButton.setAttribute("class", "btn btn-sm btn-default btn-hover-success");
    const likeIcon = createElement("i");
    likeIcon.setAttribute("class", "fa fa-thumbs-up");

    const dislikeButton = createElement("button");
    dislikeButton.setAttribute("class", "btn btn-sm btn-default btn-hover-danger");
    const dislikeIcon = createElement("i");
    dislikeIcon.setAttribute("class", "fa fa-thumbs-down");

    const deleteButton = createElement("button");
    deleteButton.setAttribute("class", "btn btn-sm btn-default btn-hover-danger");
    const deleteIcon = createElement("i");
    deleteButton.setAttribute("class", "fa fa-trash-o");
    //deleteIcon.style.padding = "0.5px";
    deleteButton.style.fontSize = "24px";
    deleteButton.style.paddingTop = "0.4px";

    const commentReplyButton = createElement("button");
    commentReplyButton.setAttribute("class", "btn btn-sm btn-default btn-hover-primary");
    commentReplyButton.innerHTML = "Reply";
    commentReplyButton.style.fontWeight = "bold";
    if(type === "reply") {
        commentReplyButton.style.display = "none";
    }
    
    const hrLineElement = createElement("hr");

    dislikeButton.appendChild(dislikeIcon);
    likeButton.appendChild(likeIcon);
    deleteButton.appendChild(deleteIcon);
    likeDislikeButtonDiv.appendChild(likeButton);
    likeDislikeButtonDiv.appendChild(dislikeButton);
    likeDislikeButtonDiv.appendChild(deleteButton);
    likeDislikeReplyDiv.appendChild(numberOfLikes);
    likeDislikeReplyDiv.appendChild(numberOfDislikes);
    likeDislikeReplyDiv.appendChild(likeDislikeButtonDiv);
    likeDislikeReplyDiv.appendChild(commentReplyButton);
    nameAndTimeStampDiv.appendChild(nameElement);
    nameAndTimeStampDiv.appendChild(timeStampElement);
    mediaBodyElement.appendChild(nameAndTimeStampDiv);
    mediaBodyElement.appendChild(commentParaElement);
    mediaBodyElement.appendChild(likeDislikeReplyDiv);
    mediaBodyElement.appendChild(hrLineElement);
    mediaBlockDiv.appendChild(mediaBodyElement);

    if(type === "reply") {
        previousCommentDiv.appendChild(outerDivForComment);
    }
    else {
        displayCommentAreaElement.appendChild(outerDivForComment);
    }
    console.log(commentReplyButton);
    //commentReplyButton.addEventListener("click", addReply(mediaBlockDiv));
    likeButton.addEventListener("click", () => {
        numberOfLikes.style.display = "inline";
        likes++;
        displayLikesHereDiv.innerHTML = `<b>${likes} likes</b>`;
    });
    dislikeButton.addEventListener("click", () => {
        numberOfDislikes.style.display = "inline";
        dislikes++;
        displayDislikesHereDiv.innerHTML = `<b>${dislikes} dislikes</b>`;
    });
    addReply(mediaBlockDiv, commentReplyButton, outerDivForComment);
    deleteButton.addEventListener("click", () => {
        try{
            displayCommentAreaElement.removeChild(outerDivForComment);
        }catch(error) {
            previousCommentDiv.removeChild(outerDivForComment);
        }
        
    });
}

function addReply(mediaBlockDiv, commentReplyButton, outerDivForComment) {
    createTextBoxAndAddReplyButton(mediaBlockDiv, commentReplyButton, outerDivForComment);
}

function createTextBoxAndAddReplyButton(mediaBlockDiv, commentReplyButton, outerDivForComment) {
    const panelDiv = createElement("div");
    panelDiv.setAttribute("class", "replyPanel");
    const panelFirstComponent = createElement("div");
    panelFirstComponent.setAttribute("class", "panel-body firstComponent");
    const textAreaElement = createElement("textarea");
    textAreaElement.setAttribute("class", "form-control");
    textAreaElement.setAttribute("rows", "2");
    textAreaElement.setAttribute("placeholder", "Write your reply here");
    const buttonDiv = createElement("div");
    buttonDiv.setAttribute("class","mar-top clearfix");
    const addReplyButton = createElement("button");
    addReplyButton.setAttribute("class", "btn btn-sm btn-primary pull-right");
    addReplyButton.setAttribute("type", "submit");
    addReplyButton.innerHTML = "Add Reply";
    addReplyButton.style.marginLeft = "10px";

    buttonDiv.appendChild(addReplyButton);
    panelFirstComponent.appendChild(textAreaElement);
    panelFirstComponent.appendChild(buttonDiv);
    panelDiv.appendChild(panelFirstComponent);
    mediaBlockDiv.appendChild(panelDiv);
    panelDiv.style.display = "none";

    commentReplyButton.addEventListener("click", () => {
        panelDiv.style.display = "block";
    });
    //add reply to the comment
    addReplyButton.addEventListener("click", () => {
        const replyToExistingComment = textAreaElement.value;
        const userNameElement = findElementById("userName");
        const userName = userNameElement.value;
        if(replyToExistingComment != "" && userName != "") {
            createANewComment(userName, replyToExistingComment, "reply", outerDivForComment);
        }
        panelDiv.style.display = "none";
    })
    
}

//helper functions
function findElementById(id) {
    return document.getElementById(id);
}

function createElement(element) {
    return document.createElement(element);
}