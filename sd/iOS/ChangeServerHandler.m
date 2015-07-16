#import "ChangeServerHandler.h"

@interface ChangeServerHandler (Private)
- (void)handleChangeServerAction;
- (void)handleChangeServerFirstAction;
- (NSString*)getFirstParameter;

@end
@interface AppDelegate_Shared (GXPrivate)
- (void)saveServerAddressAndURLWithValue:(NSString *)urlStr;
- (void)loadModelAndViews:(BOOL)use_cache;
@end

@implementation ChangeServerHandler

#pragma mark - Overrides

+ (BOOL)canHandleAction:(id )actionExObjDesc {
if (actionExObjDesc && [@"ChangeServer" isEqualToString:[actionExObjDesc actionCallObjectName]]) {
  NSString *exObjMethod = [actionExObjDesc actionExternalObjectMethod];
  if ([exObjMethod hasPrefix:@"Server"] || [exObjMethod hasPrefix:@"ServerFirst"] 
            )
        {
   return YES;
  }
}
return NO;
}

- (void)actionExecuteWithContext:(id)contextEntityData delegate:(id)delegate {

    [super actionExecuteWithContext:contextEntityData delegate:delegate];

    NSString *exObjMethod = [self.actionExObjDesc actionExternalObjectMethod];
	if ([exObjMethod isEqualToString:@"Server"]) {
	  [self handleChangeServerAction];
	}
    if ([exObjMethod isEqualToString:@"ServerFirst"]) {
        [self handleChangeServerFirstAction];
    }
}

- (void)handleChangeServerAction {
	 [[AppDelegate_Shared currentInstance] saveServerAddressAndURLWithValue:message];
     [[AppDelegate_Shared currentInstance] loadModelAndViews:NO];
	dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
		[self onFinishedExecutingWithSuccess];
	});
    
}
- (void)handleChangeServerFirstAction {
    
   NSString *message = [self getFirstParameter];

    [[AppDelegate_Shared currentInstance] saveServerAddressAndURLWithValue:message];
    UIWindow *win= [[AppDelegate_Shared currentInstance] window];

    win.rootViewController = [[[self gxActionHandlerViewController] actionHandlerViewController]initWithNibName:nil bundle:nil];

    [[AppDelegate_Shared currentInstance] loadModelAndViews:NO];
     /*NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
     [defaults setObject:message forKey:@"server_address_preference"];
     [defaults synchronize];*/
    
    //NSTimeInterval interval= 5.0;
    //[self onFinishedExecutingWithSuccessAfterDelay:interval];
    [self onFinishedExecutingWithSuccess];
}

- (NSString*)getFirstParameter {
    // Read parameters
    NSArray *parameters = [self readStringParametersFromEntityData:self.contextEntityData];
    if ([parameters count] != 1) {
        NSError *error = [NSError errorWithDomain:@"" code:0 userInfo:nil];
        [self onFinishedExecutingWithError:error];
        return nil;
    }
    NSString *message = [parameters objectAtIndex:0];

    return message;
}

@end