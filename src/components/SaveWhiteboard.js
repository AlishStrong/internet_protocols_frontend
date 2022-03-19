import React from 'react'
import { Button, ButtonGroup, Container, Dropdown } from 'react-bootstrap'
import { useState } from 'react'
import domtoimage from 'dom-to-image'
import saver from 'file-saver'

const save = (node, format) => {
  let filename = ''
  if (format === 'png') {
    filename = 'whiteboard.png'
  } else if (format === 'jpeg') {
    filename = 'whiteboard.jpeg'
  }
  domtoimage.toBlob(node).then(function (blob) {
    saver.saveAs(blob, filename)
  })
}

const SaveWhiteboard = ({ rootNode }) => {
  const [format, setFormat] = useState('png')

  return (
    <Container>
      <Dropdown as={ButtonGroup} onSelect={(e) => {
        setFormat(e)
      }}>
        <Button variant="primary" onClick={() => save(rootNode, format)}>Save as</Button>

        <Dropdown.Toggle split variant="primary" id="dropdown-split-basic"/>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1" eventKey="png">PNG</Dropdown.Item>
          <Dropdown.Item href="#/action-2" eventKey="jpeg">JPEG</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Container>
  )
}

export default SaveWhiteboard
