#import "ChangeServerHandler.h"

@interface ChangeServerHandler (Private)
- (void)handleChangeServerAction;
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
  if ([exObjMethod hasPrefix:@"Server"]
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
}

- (void)handleChangeServerAction {
    
    NSString *message = [self getFirstParameter];
    
    [[AppDelegate_Shared currentInstance] saveServerAddressAndURLWithValue:message];
    UIWindow *win= [[AppDelegate_Shared currentInstance] window];
    
    win.rootViewController = [[[self gxActionHandlerViewController] actionHandlerViewController]initWithNibName:nil bundle:nil];
    
    [[AppDelegate_Shared currentInstance] loadModelAndViews:NO];
     /*NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
     [defaults setObject:message forKey:@"server_address_preference"];
     [defaults synchronize];*/
    

    //[self onFinishedExecutingWithSuccess];
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