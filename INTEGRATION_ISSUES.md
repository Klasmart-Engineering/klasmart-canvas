# Integration Issues

## Content Consistency
#### If canvas is recreated without the context being recreated all content of canvas disappears. 

#### Reproduction Steps (KidsLoop Live)
1. Visit KidsLoop live site.
2. Go into present mode.
3. Put some content in the canvas.
4. Go into student mode.

##### Actual Results
* The canvas is empty

##### Expected Results
* The canvas contains the content added in step 3.

##### Possible Reason
* The SharedEventSerializerProvider doesn't re-emit the events when a new canvas instance is created. We may need to add some way of fetching the entire history of events on demand from server (or cache the event list in memory locally).

## Editing Tools
#### When adding text the input box doesn't get enlarged when characters are being typed.

#### Reproduction Steps
1. Press the 'add text' tool in toolbar.
2. Press anywhere inside the canvas.
3. Type some text.

##### Actual Results
* The text editor box is at right location but doesn't resize.

#### Expected Results
* The text editor box is at right location and resize automatically as text is being typed.