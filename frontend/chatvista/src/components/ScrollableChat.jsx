import React from 'react'
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import "./style.css"
import {
    isLastMessage,
    isSameSender,
    isSameSenderMargin,
    isSameUser,
  } from "../config/ChatLogics";
  import { ChatState } from "../Context/ChatProvider";
const ScrollableChat = ({messages,onMessageClick}) => {
    const { user } = ChatState();
    
  return (
    <ScrollableFeed>
    {messages &&
        messages.map((m, i) => (
            <div style={{ display: "flex", flexDirection: "column" }} key={m._id}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    {(isSameSender(messages, m, i, user._id) ||
                        isLastMessage(messages, i, user._id)) && (
                            <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                                <Avatar
                                    mt="7px"
                                    mr={1}
                                    size="sm"
                                    cursor="pointer"
                                    name={m.sender.name}
                                    src={m.sender.pic}
                                />
                            </Tooltip>
                        )}
                    <span
                        style={{
                            backgroundColor: `${
                                m.sender._id === user._id ? "#BEd3F8" : "#B9F5D0"
                            }`,
                            marginLeft: isSameSenderMargin(messages, m, i, user._id),
                            borderRadius: "12px",
                            padding: "5px 15px",
                            maxWidth: "75%",
                            fontSize:"18px"
                        }}
                        className="chat-message"
                        onClick={() => onMessageClick(m.content)}
                    >
                        {m.content}
                    </span>
                </div>
                <span
                    style={{
                        fontSize: "10px",
                        color: "#999",
                        marginTop: "5px",
                        alignSelf: m.sender._id === user._id ? "flex-end" : "flex-start",
                    }}
                >
                    {new Date(m.createdAt).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                    })}
                </span>
            </div>
        ))}
</ScrollableFeed>
  )
}

export default ScrollableChat
