let valueStore, value, valueStoreBut1, valueBut1, renderedContent;
// If the input has changed (deletion or character swap/addition) in the middle
// Re-render everything (very laggy, but I haven't found a solution around it)
// (also shouldn't happen very often in typing practice)
// OR more than one character has been added/deleted

// AddMid:         {if (valueBut1 !== valueStore   && value.length > valueStore.length                                        ) {}},          // 1
// Swap:           {if (valueBut1 !== valueStore   && value.length === valueStore.length                                      ) {}},          // 1
// MidDelettion:   {if (valueBut1 !== valueStore   && value.length < valueStore.length && valueStoreBut1 !== value            ) {}},          // 1

// Add:            {if (valueBut1 === valueStore   && value.length > valueStore.length                                        ) {}},          // 0
// EndDeletion:    {if (valueBut1 !== valueStore   && value.length < valueStore.length && valueStoreBut1 === valueBut1        ) {}},          // 0
//                  yes                                 
if (
    !(
        (valueBut1 === valueStore && value.length > valueStore.length) ||
        (valueBut1 !== valueStore &&
            value.length < valueStore.length &&
            valueStoreBut1 === valueBut1)
    ) ||
    Math.abs(renderedContent.length - value.length) > 1
) {
}
