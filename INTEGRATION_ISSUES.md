# Integration Issues

## Content Consistency

#### Canvas crash if events is reapplied after reload.

##### Reproduction Steps

1. Enable the `simulatePersistence` property on `SharedEventSerializerContextProvider`.
2. Put some content in the canvas. Observe log to see the persistent events being stored.
3. Hit reload (F5)

##### Actual Results

1. Errors is presented on screen.

##### Expected Results

1. The canvas is reloaded looking same as it did after step 2.

#### If canvas is recreated without the context being recreated all content of canvas disappears.

##### Reproduction Steps (KidsLoop Live)

1. Visit KidsLoop live site.
2. Go into present mode.
3. Put some content in the canvas.
4. Go into student mode.

##### Actual Results

- The canvas is empty

##### Expected Results

- The canvas contains the content added in step 3.

##### Possible Reason

- The SharedEventSerializerProvider doesn't re-emit the events when a new canvas instance is created. We may need to add some way of fetching the entire history of events on demand from server (or cache the event list in memory locally).

## Add Text Tool

#### When adding text the input box doesn't get enlarged when characters are being typed.

#### Reproduction Steps

1. Press the 'add text' tool in toolbar.
2. Press anywhere inside the canvas.
3. Type some text.

##### Actual Results

- The text editor box is at right location but doesn't resize.

#### Expected Results

- The text editor box is at right location and resize automatically as text is being typed.

#### Editing text doesn't display the cursor at selected location.

#### Reproduction Steps

1. Add text to the canvas.
2. With text tool selected, click the text added in step 1.
3. Type some text.

##### Actual Results

- The text is added to the end of text added in step 1.
- The cursor is blinking at the start of text added in step 1.
- User can't press arrow keys to move the cursor around.

##### Expected Results

- The text is added where the user presed the text added in step 1.
- The text is added to the original text added in step 1.
- The cursor is blinking where the user pressed the edited text.
- User can press arrow keys to move the cursor around.
