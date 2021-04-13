import React from 'react'
import './style.css'

export default function Comment({username, comment}) {
    return  (
        <div className="comment">
          <p>
            <strong className="mr-2">{username}</strong> {comment}
          </p>
        </div>
      );
}
