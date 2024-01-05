import React, { useEffect, useState } from "react";
import { FaFacebookMessenger } from "react-icons/fa";
import { Modal, Button, TextField } from "@mui/material";
import { TokenRequest, publicRequest } from "../RequestMethod/Request";

const Message = ({ sublessonData }) => {
  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentIdToReply, setCommentIdToReply] = useState(null);
  const [parentReplyId, setParentReplyId] = useState(null);
  const [submitCounter, setSubmitCounter] = useState(0);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const handleOpenReplyModal = () => {
      setReplyModalOpen(true);
    };

    const fetchComments = async () => {
      try {
        const response = await publicRequest.get(
          `/comments/getAll/${sublessonData.id}`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();

    if (commentIdToReply !== null && parentReplyId !== null) {
      handleOpenReplyModal();
    }
  }, [sublessonData.id, submitCounter, commentIdToReply, parentReplyId]);

  const handleReplyClick = (commentId, parentReplyId) => {
    console.log("commentId", commentId);
    console.log("parentReplyId", parentReplyId);
    setCommentIdToReply(commentId);
    setParentReplyId(parentReplyId);
  };

  const handleReplyModalClose = () => {
    setReplyModalOpen(false);
    setReplyText("");
    setCommentIdToReply(null);
  };

  const handleReplySubmit = async () => {
    try {
      const replys = await TokenRequest.post("/replys/create", {
        replyText,
        parentReplyId,
        replyImage: null,
        commentId: commentIdToReply,
      });

      console.log("Reply submitted:", replys);
      handleReplyModalClose();
      setSubmitCounter((prevCounter) => prevCounter + 1);
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const commentsResponse = await TokenRequest.post("/comments/create", {
        commentText,
        commentImage: "",
        subLessionId: sublessonData.id,
      });

      console.log("Comment submitted:", commentsResponse);
      setSubmitCounter((prevCounter) => prevCounter + 1);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };
  return (
    <div>
      <div className="border border-blue-500 rounded-lg overflow-hidden">
        <div className="p-5 space-y-3 bg-[#eff1f3]">
          <span className="p-2 bg-[#d6d6d6] text-blue-700 font-bold rounded-lg">
            Thời gian: 0s
          </span>
          <p className="text-gray-400 p-2 opacity-60">
            Thưa thầy/cô. Em có vấn đề chưa hiểu, em xin đặt câu hỏi như sau:
          </p>
          <div className="ml-5">
            <textarea
              placeholder="Nhập nội dung..."
              className="bg-transparent w-full outline-none"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </div>
          <p className="text-gray-400 border-b-2 p-2 opacity-60">
            Nhờ thầy cô hỗ trợ giúp em ạ. Em cảm ơn
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center text-blue-600 border-r-2 p-2 gap-2 cursor-pointer font-serif">
                <FaFacebookMessenger />
                <span>Gửi ảnh </span>
              </div>
              <div className="flex items-center text-blue-600 border-r-2 p-2 gap-2 cursor-pointer font-serif">
                <FaFacebookMessenger />
                <span>Công thức </span>
              </div>
              <div className="flex items-center text-blue-600 p-2 gap-2 cursor-pointer font-serif">
                <FaFacebookMessenger />
                <span>Quy định đăng bình </span>
              </div>
            </div>
            <div
              className="bg-blue-700 px-5 py-2 text-white rounded-lg font-bold cursor-pointer"
              onClick={handleCommentSubmit}
            >
              Hỏi Ngay
            </div>
          </div>
        </div>
      </div>

      <Modal open={replyModalOpen} onClose={handleReplyModalClose}>
        <div className="p-5 space-y-3 bg-[#eff1f3]">
          <TextField
            label="Reply"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <div className="flex justify-end">
            <Button onClick={handleReplyModalClose}>Cancel</Button>
            <Button
              onClick={handleReplySubmit}
              variant="contained"
              color="primary"
            >
              Reply
            </Button>
          </div>
        </div>
      </Modal>

      <div className="flex items-center justify-between mx-10 mt-5">
        <p className="font-semibold text-xl">
          {comments ? comments.length : 0} Câu hỏi
        </p>
        <div className="border text-sm p-2 flex items-center gap-2 rounded-md">
          <FaFacebookMessenger />
          <input
            type="text"
            name=""
            id=""
            placeholder="Tìm theo nội dung, người gửi..."
            className="outline-none bg-transparent px-3"
          />
        </div>
      </div>

      <div className="m-4 mx-10 relative">
        {comments?.map((comment) => (
          <div
            key={`comment-${comment.id}-${submitCounter}`}
            className="bg-[#eff1f3] rounded-lg p-4 w-[70%]"
          >
            <div className="flex items-center">
              <img
                src={comment.user.avatar || "https://hocmai.vn/pix/u/f2.png"}
                alt="Profile Image"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h1 className="text-xl font-bold text-blue-600">
                  {comment.user.username}
                </h1>
                <p className="text-gray-600">Khoảng 4 ngày trước</p>
              </div>
            </div>
            <div className="mt-4">
              <p>{comment.commentText}</p>
            </div>
            {comment.replies && comment.replies.length > 0 && (
              <div
                className="ml-10 mt-5 relative"
                key={`replies-${comment.id}-${submitCounter}`}
              >
                {comment.replies
                  .slice()
                  .reverse()
                  .map((reply) => (
                    <div
                      key={reply.id}
                      className="bg-[#eff1f3] rounded-lg p-4 w-[70%]"
                    >
                      <div className="flex items-center">
                        <img
                          src={
                            reply.user.avatar ||
                            "https://hocmai.vn/pix/u/f2.png"
                          }
                          alt="Profile Image"
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <h1 className="text-xl font-bold text-blue-600">
                            {reply.user.username}
                          </h1>
                          <p className="text-gray-600">Khoảng 4 ngày trước</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p>{reply.replyText}</p>
                      </div>
                      <div
                        className="bg-blue-600 p-2 rounded-lg text-white font-bold cursor-pointer absolute right-0 top-16"
                        onClick={() => handleReplyClick(comment.id, reply.id)}
                      >
                        Reply
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Message;
